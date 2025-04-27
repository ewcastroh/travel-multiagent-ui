import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMessageRequestDto } from '@models/user-message.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TravelPlannerService {
  private readonly sessionId = uuidv4(); // Keep same session
  private readonly API_URL = `${environment.backendApi}/travel/chat`;

  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public chat(message: string): Observable<any> {
    return this.http.post(`${this.API_URL}?sessionId=${this.sessionId}`, {
      message
    } as UserMessageRequestDto);
  }
}
