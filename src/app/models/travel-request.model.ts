export interface TravelRequestDto {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  travelType: string;
  peopleCount: number;
}
