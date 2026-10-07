import { useEffect, useEffectEvent } from "react";

import { useAuth } from "@/providers/AuthProvider";

import { notificationsService } from "../api/notifications.service";
import { parseTextMessageEvent } from "../notifications.schema";
import type { TextMessageEvent } from "../notifications.types";

const RETRY_DELAY_MS = 5000;

export function useNotificationPolling(
  onMessage: (message: TextMessageEvent) => void,
) {
  const { isAuthenticated } = useAuth();
  const handleMessage = useEffectEvent(onMessage);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const controller = new AbortController();
    void watchNotifications(controller.signal, (message) => handleMessage(message));
    return () => controller.abort();
  }, [isAuthenticated]);
}

async function watchNotifications(
  signal: AbortSignal,
  onMessage: (message: TextMessageEvent) => void,
) {
  while (!signal.aborted) {
    try {
      const notification =
        await notificationsService.receiveNotification();

      if (!notification) {
        continue;
      }

      const message = parseTextMessageEvent(notification.body);
      if (message) {
        onMessage(message);
      }
      await notificationsService.deleteNotification(notification.receiptId);
    } catch {
      if (signal.aborted) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}
