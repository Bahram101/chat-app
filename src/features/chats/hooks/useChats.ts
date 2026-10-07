import { useEffect, useState } from "react";

import { chatsStorage } from "@/lib/storage/chatsStorage";

import type { Chat, Message } from "../chats.types";

export function useChats() {
  const [chats, setChats] = useState(chatsStorage.getChats);

  useEffect(() => {
    chatsStorage.setChats(chats);
  }, [chats]);

  function addChat(chatId: string, name: string) {
    setChats((prev) => {
      if (prev.some((c) => c.chatId === chatId)) {
        return prev;
      }
      return [{ chatId, name, messages: [] }, ...prev];
    });
  }

  function addMessage(chatId: string, message: Message) {
    setChats((prev) => {
      const chat = prev.find((c) => c.chatId === chatId);
      if (!chat || chat.messages.some((m) => m.id === message.id)) {
        return prev;
      }
      const updatedChat: Chat = {
        ...chat,
        messages: [...chat.messages, message],
      };
      return [updatedChat, ...prev.filter((c) => c.chatId !== chatId)];
    });
  }

  return { chats, addChat, addMessage };
}
