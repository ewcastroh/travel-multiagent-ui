export interface TravelPlanResponseDto {
  destination: string;
  flights: string[];
  hotels: string[];
  weatherForecast: string;
  itinerary: string[];
  estimatedTotal: number;
  recommendation: string;
  agentRationales: Record<string, string>;
}
