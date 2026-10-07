# Telegram Chat — GREEN-API

Тестовое задание на позицию «Фронтенд разработчик React».

Веб-интерфейс для отправки и получения текстовых сообщений в Telegram через [GREEN-API](https://green-api.com). Внешний вид взят с [web.max.ru](https://web.max.ru/). Задание допускает Telegram вместо MAX.

## Возможности

- Вход по `idInstance` и `apiTokenInstance` из личного кабинета GREEN-API
- Создание чата по номеру телефона получателя
- Отправка текстовых сообщений ([SendMessage](https://green-api.com/telegram/docs/api/sending/SendMessage/))
- Получение ответов через HTTP API ([ReceiveNotification](https://green-api.com/telegram/docs/api/receiving/technology-http-api/ReceiveNotification/) + [DeleteNotification](https://green-api.com/telegram/docs/api/receiving/technology-http-api/DeleteNotification/))
- Чаты и история сообщений сохраняются в `localStorage`

## Стек

| | |
| --- | --- |
| React 19 + TypeScript | UI |
| Vite | сборка и dev-сервер |
| Tailwind CSS | стили |
| Axios | запросы к GREEN-API |
| TanStack Query | состояния запросов (загрузка, ошибки) |
| React Hook Form | формы входа и создания чата |
| Zod | проверка входящих уведомлений |

## Запуск локально

Нужен Node.js 20.19+ или 22.12+.

```bash
git clone https://github.com/Bahram101/chat-app.git
cd chat-app
npm install
npm run dev
```

Приложение откроется на http://localhost:5173.

Сборка для продакшена:

```bash
npm run build
npm run preview
```

## Настройка инстанса GREEN-API

1. Создайте инстанс Telegram в [личном кабинете](https://console.green-api.com) и авторизуйте его.
2. В настройках инстанса:
   - поле **webhookUrl** должно быть пустым, иначе уведомления не попадут в очередь HTTP API;
   - включите получение уведомлений о входящих сообщениях.
3. Скопируйте `idInstance` и `apiTokenInstance` и введите их на странице входа.

Переменные окружения не нужны: учетные данные вводит пользователь.

## Как это работает

**Создание чата.** В Telegram входящие сообщения приходят с числовым `chatId` (например, `5605075020`), а не с номером телефона. Поэтому при создании чата номер проверяется методом [CheckAccount](https://green-api.com/telegram/docs/api/service/CheckAccount/), и чат сохраняется с полученным `chatId`. Так ответы попадают в нужный чат.

**Получение сообщений.** Пока пользователь авторизован, в цикле выполняется long polling:

1. `receiveNotification` с `receiveTimeout=5`. Сервер ждет до 5 секунд и отвечает сразу, как только приходит уведомление.
2. Текстовое сообщение добавляется в чат. Остальные типы уведомлений пропускаются.
3. `deleteNotification` удаляет уведомление из очереди.

Сообщения из чатов, которые пользователь не создавал (группы, каналы), не показываются.

## Структура

```
src/
  features/
    auth/            # вход: проверка инстанса через getStateInstance
    chats/           # список чатов, создание чата, окно чата
    messages/        # отправка сообщений
    notifications/   # получение сообщений (polling)
  lib/
    api/client.ts    # axios: подставляет idInstance и токен в URL
    storage/         # localStorage
  pages/             # LoginPage, ChatPage
  providers/         # AuthProvider, QueryProvider
```
