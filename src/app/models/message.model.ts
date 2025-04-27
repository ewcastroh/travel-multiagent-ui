export interface Message {
  id: string;
  text: string;
  senderType: SenderType;
}

export enum SenderType {
  USER = 'user',
  AGENT = 'agent',
}
