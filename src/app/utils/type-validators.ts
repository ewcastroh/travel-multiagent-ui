/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimpleTextResponseDto } from '@models/simple-text-response.model';
import { TravelPlanResponseDto } from '@models/travel-plan.model';

export function isSimpleTextResponse(obj: any): obj is SimpleTextResponseDto {
  return typeof obj === 'object' && obj !== null && 'message' in obj;
}

export function isTravelPlanResponse(obj: any): obj is TravelPlanResponseDto {
  return typeof obj === 'object' && obj !== null &&
         'destination' in obj &&
         'flights' in obj &&
         'hotels' in obj &&
         'weatherForecast' in obj &&
         'itinerary' in obj &&
         'estimatedTotal' in obj &&
         'recommendation' in obj &&
         'agentRationales' in obj;
}
