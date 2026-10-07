import { useMutation } from "@tanstack/react-query";

import { messagesService } from "../api/messages.service";

export function useSendMessage() {
  return useMutation({
    mutationFn: messagesService.sendMessage,
  });
}
