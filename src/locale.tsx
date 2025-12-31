import type { TOpportunity } from './app/types/ui';

import { BadgeRussianRuble, Eye, ShoppingBag, TrendingUp } from 'lucide-react';

export const opportunity: TOpportunity[] = [
  {
    title: 'Продавайте',
    description: 'Продавайте свои собственные картинки или вложения, получая за них деньги сразу себе',
    icon: <BadgeRussianRuble />,
  },
  {
    title: 'Покупайте',
    description: 'Приобретайте самые дорогие картинки в своей жизни! У нас они никогда не закончатся',
    icon: <ShoppingBag />,
  },
  {
    title: 'Смотрите',
    description: 'Ищите вдохновение в других работах, находите лучшие и используйте их',
    icon: <Eye />,
  },
  {
    title: 'Сообщество',
    description: 'Смотрите, что купили другие, чтобы не отставать и быть всегда в трендах',
    icon: <TrendingUp />,
  },
];
