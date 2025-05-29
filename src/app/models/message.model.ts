import { TravelPlanResponseDto } from './travel-plan-response.model';

export interface Message {
  id: string;
  text: string;
  senderType: SenderType;
  userTranscription?: string;
  backendTranscription?: string;
  travelPlan?: TravelPlanResponseDto;
}

export enum SenderType {
  USER = 'user',
  AGENT = 'agent',
}
