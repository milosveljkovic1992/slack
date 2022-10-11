type timestamp = Date & {
  seconds?: number;
};

export type MessageType = {
  id: string;
  senderId: string;
  senderUsername: string;
  body: string;
  timestamp: timestamp;
};
