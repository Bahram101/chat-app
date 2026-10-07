export type Message = {
  id: string;
  text: string;
  direction: "in" | "out";
  timestamp: number;
};

export type Chat = {
  chatId: string;
  name: string;
  messages: Message[];
};

export type CheckAccountPayload = {
  phoneNumber: number;
};

export type CheckAccountResponse = {
  exist: boolean;
  chatId: string;
};
