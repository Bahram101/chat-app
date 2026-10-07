import { formatTime } from "@/lib/utils/date";

import type { Chat } from "../chats.types";

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onSelect: (chatId: string) => void;
};

export function ChatList({ chats, activeChatId, onSelect }: Props) {
  if (chats.length === 0) {
    return (
      <p className="p-6 text-center text-sm text-slate-400">
        Чатов пока нет. Введите номер телефона, чтобы начать
      </p>
    );
  }

  return (
    <ul className="flex-1 overflow-y-auto">
      {chats.map((chat) => {
        const lastMessage = chat.messages.at(-1);

        return (
          <li key={chat.chatId}>
            <button
              onClick={() => onSelect(chat.chatId)}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 ${
                chat.chatId === activeChatId ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-700">
                {chat.name.replace("+", "").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate font-medium text-slate-900">
                    {chat.name}
                  </span>
                  {lastMessage && (
                    <span className="shrink-0 text-xs text-slate-400">
                      {formatTime(lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-slate-500">
                  {lastMessage?.text ?? "Нет сообщений"}
                </p>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
