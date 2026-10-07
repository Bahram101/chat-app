import type { Chat } from "@/features/chats/chats.types";

const CHATS_KEY = "chats";

export const chatsStorage = {
  setChats(chats: Chat[]) {
    localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
  },

  getChats(): Chat[] {
    try {
      const chats = localStorage.getItem(CHATS_KEY);
      return chats ? (JSON.parse(chats) as Chat[]) : [];
    } catch {
      return [];
    }
  },

  clearChats() {
    localStorage.removeItem(CHATS_KEY);
  },
};
