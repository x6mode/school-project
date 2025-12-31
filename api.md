# Routes

GET `https://localhost:5000/api/product?page=1` - Вернет первую страницу (6 штук) **Product[]**

GET `https://localhost:5000/api/product/:id/buyers/` - Вернет **User[]** (не более 6 штук), которые купили арт

GET `https://localhost:5000/photos/:id` - Где id, id продукта, вернет картинку

POST `https://localhost:5000/api/product/buy` - Покупка товара:  
Тело:

```json
{
  "id": "..."
}
```

POST `https://localhost:5000/api/auth/login`  
Тело:

```json
{
  "login": "...",
  "password": "..."
}
```

Ответ: обьект в виде **User** + ключ `token` в который положишь ключ

POST `https://localhost:5000/api/auth/register`  
Тело:

```json
{
  "login": "...",
  "password": "...",
  "mail": "..."
}
```

Ответ: обьект в виде **User** + ключ `token` в который положишь ключ

GET `https://localhost:5000/api/auth/profile` - Вернет информацию о аккаунте по ключу  
Заголовки:

- Bearer [token]

---

# Entities

**User**:

```json
{
  "id": "...",
  "bayed": Product[], // Купленные арты
  "nickname": "...",
  "mail": "...",
  "createdAt": Datetime,
  "updatedAt": Datetime,
  "posted": Product[] // Выложенные арты
}
```

**Product**:

```json
{
  "id": "...",
  "photoUrl": "...",
  "creator": Account, // владелец
  "title": "...",
  "price": 123,
  "description": "...",
  "updatedAt": Datetime,
  "createdAt": Datetime,
}
```
