import { ArrowLeft, SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useSendMessage } from "@/features/messages/hooks/useSendMessage";
import { formatTime } from "@/lib/utils/date";

import type { Chat, Message } from "../chats.types";

type Props = {
  chat: Chat;
  onBack: () => void;
  onMessageSent: (message: Message) => void;
};

export function ChatWindow({ chat, onBack, onMessageSent }: Props) {
  const [text, setText] = useState("");
  const sendMessage = useSendMessage();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages.length]);

  function handleSend() {
    const message = text.trim();
    if (!message || sendMessage.isPending) {
      return;
    }

    sendMessage.mutate(
      { chatId: chat.chatId, message },
      {
        onSuccess: ({ idMessage }) => {
          onMessageSent({
            id: idMessage,
            text: message,
            direction: "out",
            timestamp: Date.now(),
          });
          setText("");
        },
      },
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <h2 className="truncate font-medium text-slate-900">{chat.name}</h2>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {chat.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.direction === "out" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3 py-2 shadow-sm ${
                message.direction === "out"
                  ? "rounded-br-sm bg-blue-600 text-white"
                  : "rounded-bl-sm bg-white text-slate-900"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p
                className={`mt-0.5 text-right text-[11px] ${
                  message.direction === "out"
                    ? "text-blue-100"
                    : "text-slate-400"
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="border-t border-slate-200 bg-white p-3"
      >
        {sendMessage.error && (
          <p className="mb-2 text-xs text-red-600">
            {sendMessage.error.message}
          </p>
        )}
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Сообщение"
            className="min-w-0 flex-1 bg-slate-100 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            title="Отправить"
            disabled={!text.trim() || sendMessage.isPending}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40"
          >
            <SendHorizontal size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
