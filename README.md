# Backend проекта FocusFlow

## Описание

Данный репозиторий содержит серверную часть проекта FocusFlow.  
Backend реализован на Node.js с использованием Express и предоставляет REST API для регистрации, аутентификации и работы с пользовательскими данными.

Серверная часть разработана независимо от клиентской и может быть подключена к любому frontend-приложению.

---

## Используемые технологии

- Node.js
- Express.js
- JWT (аутентификация)
- dotenv
- REST API
- Хранение данных в формате JSON

---

## Структура проекта

backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── repositories/
│   ├── utils/
│   └── data/
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

---

## Установка и запуск

1. Клонировать репозиторий:

git clone https://github.com/musinyanalla06-lab/backend.project.git

2. Перейти в папку backend:

cd backend

3. Установить зависимости:

npm install

---

## Переменные окружения

Для работы сервера необходимо создать файл .env в корне проекта и указать в нём:

PORT=3000  
JWT_SECRET=your_secret_key

Файл .env не добавляется в репозиторий.

---

## Запуск сервера

npm start

Сервер будет доступен по адресу:

http://localhost:3000

---

## Назначение проекта

Проект разработан в учебных целях и демонстрирует работу backend-приложения с REST API, JWT-аутентификацией и разделением логики по слоям.
