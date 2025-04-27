export interface Message {
  id: string;
  text: string;
  isUserMessage: boolean;
  sender: SenderType;
  // isLoading?: boolean;
}

export enum SenderType {
  USER = 'user',
  AGENT = 'agent',
}
