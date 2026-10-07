import { useMutation } from "@tanstack/react-query";

import { normalizePhone } from "@/lib/utils/phone";

import { chatsService } from "../api/chats.service";

export function useCreateChat() {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { exist, chatId } = await chatsService.checkAccount({
        phoneNumber: Number(normalizePhone(phone)),
      });
      if (!exist) {
        throw new Error("Этот номер не зарегистрирован в Telegram");
      }
      return chatId;
    },
  });
}
