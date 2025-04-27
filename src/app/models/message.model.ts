import { TravelPlanResponseDto } from './travel-plan.model';

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
