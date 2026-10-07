import { apiClient } from "@/lib/api/client";

import type {
  DeleteNotificationResponse,
  ReceiveNotificationResponse,
} from "../notifications.types";

export const notificationsService = {
  async receiveNotification(): Promise<ReceiveNotificationResponse> {
    const { data } = await apiClient.get("/receiveNotification/{token}");
    return data;
  },

  async deleteNotification(receiptId: number) {
    const { data } = await apiClient.delete<DeleteNotificationResponse>(
      `/deleteNotification/{token}/${receiptId}`,
    );
    return data;
  },
};
