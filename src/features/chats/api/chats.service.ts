import { apiClient } from "@/lib/api/client";

import type { CheckAccountPayload, CheckAccountResponse } from "../chats.types";

export const chatsService = {
  async checkAccount(
    payload: CheckAccountPayload,
  ): Promise<CheckAccountResponse> {
    const { data } = await apiClient.post<CheckAccountResponse>(
      "/checkAccount/{token}",
      payload,
    );
    return data;
  },
};
