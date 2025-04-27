import { TravelPlanResponseDto } from './travel-plan-response.model';

export interface Message {
  id: string;
  text: string;
  senderType: SenderType;
  travelPlan?: TravelPlanResponseDto;
}

export enum SenderType {
  USER = 'user',
  AGENT = 'agent',
}
