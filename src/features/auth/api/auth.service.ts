import { apiClient } from "@/lib/api/client";

import type { StateInstanceResponse } from "../auth.types";

export const authService = {
  async getStateInstance(): Promise<StateInstanceResponse> {
    const { data } = await apiClient.get<StateInstanceResponse>(
      "/getStateInstance/{token}",
    );
    return data;
  },
};
