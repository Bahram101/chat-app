import { z } from "zod";

import type { TextMessageEvent } from "./notifications.types";

const textMessageNotificationSchema = z.object({
  typeWebhook: z.string("incomingMessageReceived"),
  idMessage: z.string(),
  timestamp: z.number(),
  senderData: z.object({
    chatId: z.string(),
  }),
  messageData: z.discriminatedUnion("typeMessage", [
    z.object({
      typeMessage: z.literal("textMessage"),
      textMessageData: z.object({ textMessage: z.string() }),
    }),
  ]),
});

export function parseTextMessageEvent(body: unknown): TextMessageEvent | null {
  const parsed = textMessageNotificationSchema.safeParse(body);
  if (!parsed.success) {
    return null;
  }

  const { typeWebhook, idMessage, timestamp, senderData, messageData } =
    parsed.data;
  const text = messageData.textMessageData.textMessage;

  return {
    id: idMessage,
    chatId: senderData.chatId,
    text,
    timestamp: timestamp * 1000,
    direction: typeWebhook === "incomingMessageReceived" ? "in" : "out",
  };
}
