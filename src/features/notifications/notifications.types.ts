export type Notification = {
  receiptId: number;
  body: unknown;
};

export type ReceiveNotificationResponse = Notification | null;

export type DeleteNotificationResponse = {
  result: boolean;
};

export type TextMessageEvent = {
  id: string;
  chatId: string;
  text: string;
  timestamp: number;
  direction: "in" | "out";
};
