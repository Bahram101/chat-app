import { useState } from "react";

import { ChatList } from "@/features/chats/components/ChatList";
import { ChatWindow } from "@/features/chats/components/ChatWindow";
import { NewChatForm } from "@/features/chats/components/NewChatForm";
import { useChats } from "@/features/chats/hooks/useChats";
import { useNotificationPolling } from "@/features/notifications/hooks/useNotificationPolling";
import { chatsStorage } from "@/lib/storage/chatsStorage";
import { formatPhone } from "@/lib/utils/phone";
import { useAuth } from "@/providers/AuthProvider";
import Header from "@/features/chats/components/Header";

export function ChatPage() {
  const { credentials, signOut } = useAuth();
  const { chats, addChat, addMessage } = useChats();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const activeChat = chats.find((chat) => chat.chatId === activeChatId);

  useNotificationPolling(({ chatId, ...message }) => {
    addMessage(chatId, message);
  });

  function handleCreateChat(chatId: string, phone: string) {
    addChat(chatId, formatPhone(phone));
    setActiveChatId(chatId);
  }

  function handleLogout() {
    chatsStorage.clearChats();
    signOut();
  }

  return (
    <div className="flex h-dvh bg-slate-100">
      <aside
        className={`w-full flex-col border-r border-slate-200 bg-white md:flex md:w-80 ${
          activeChat ? "hidden" : "flex"
        }`}
      >
        <Header credentials={credentials} handleLogout={handleLogout} />
        <NewChatForm onCreate={handleCreateChat} />
        <ChatList
          chats={chats}
          activeChatId={activeChatId}
          onSelect={setActiveChatId}
        />
      </aside>

      <main
        className={`flex-1 flex-col md:flex ${activeChat ? "flex" : "hidden"}`}
      >
        {activeChat && (
          <ChatWindow
            key={activeChat.chatId}
            chat={activeChat}
            onMessageSent={(message) => addMessage(activeChat.chatId, message)}
          />
        )}
      </main>
    </div>
  );
}
