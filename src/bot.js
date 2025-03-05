const { Telegraf } = require('telegraf');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

// cообщения бота
const messages = require('./messages');

// инициализация .env
dotenv.config();

// служебные переменные
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const dbService = new PrismaClient();

// ответы пользователей
const userResponses = {};

// Команда /start

bot.start((ctx) => ctx.replyWithHTML(messages.startCommand));

// Покупка товара

bot.command('buy', (ctx) => {});

// Добавление товара

bot.command('add', (ctx) => {
  const chatId = ctx.message.id;
  userResponses[chatId] = { step: 0, answers: [] };
  ctx.replyWithHTML(messages.questions[0]);
});

// Удаление товара

bot.command('remove', async (ctx) => {
  const number = ctx.message.text.split(' ')[1];
  if (!number || isNaN(number)) return ctx.replyWithHTML(messages.invalidRemove);

  await dbService.product.delete({ where: { id: parseInt(number) } });
  ctx.replyWithHTML(messages.deletedItem.replace('%id%', number));
});

// Команда помощи

bot.command('help', (ctx) => ctx.replyWithHTML(messages.help));

// Каталог товаров

bot.command('catalog', async (ctx) => {
  const productsList = await dbService.product.findMany({ take: 4 });
  if ( productsList == '' ) return ctx.replyWithHTML(messages.catalogEmpty);

  productsList.forEach(product => ctx.replyWithHTML(  
      messages.catalogItem
      .replace("%id%", product.id)
      .replace("%name%", product.name)
      .replace("%desc%", product.description)
    ));
});

// Обработчик для создания товара

bot.on('text', async (ctx) => {
  const chatId = ctx.message.id;
  const userData = userResponses[chatId];

  if ( !userData ) return;
  if ( ctx.message.text === '/cancel' ) return delete userResponses[chatId];

  userData.answers.push(ctx.message.text);

  if ( userData.step === messages.questions.length - 1 ) {
    ctx.replyWithHTML(`Ваш товар: <b>${userData.answers[0]}</b>\n\n<b>С описанием:</b>\n${userData.answers[1]}\n\nУспешно добавлен`, {});
    await dbService.product.create({
      data: {
        name: userData.answers[0],
        description: userData.answers[1]
      }
    });

    delete userResponses[chatId];
    return;
  }

  userData.step += 1;
  ctx.replyWithHTML(messages.questions[userData.step]);
});

// Административная команда

bot.command('clear', (ctx) => {
  userResponses = {};
  ctx.replyWithHTML('Удалено!');
})

// Запуск бота

bot.launch(() => console.log("Бот запущен!"));
