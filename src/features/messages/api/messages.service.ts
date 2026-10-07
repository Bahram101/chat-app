import { apiClient } from "@/lib/api/client";

import type {
  SendMessagePayload,
  SendMessageResponse,
} from "../messages.types";

export const messagesService = {
  async sendMessage(payload: SendMessagePayload): Promise<SendMessageResponse> {
    const { data } = await apiClient.post<SendMessageResponse>(
      "/sendMessage/{token}",
      payload,
    );
    return data;
  },
};
