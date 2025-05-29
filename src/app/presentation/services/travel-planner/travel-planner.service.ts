import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMessageRequestDto } from '@models/user-message.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { AudioChatResponse } from '@models/audio-chat-response.model';

@Injectable({
  providedIn: 'root'
})
export class TravelPlannerService {
  private readonly sessionId = uuidv4(); // Keep same session
  private readonly CHAT_API_URL = `${environment.backendApi}/travel/chat`;
  private readonly TRANSCRIBE_API_URL = `${environment.backendApi}/travel/transcribe-and-plan`;

  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public chat(message: string): Observable<any> {
    return this.http.post(`${this.CHAT_API_URL}?sessionId=${this.sessionId}`, {
      message
    } as UserMessageRequestDto);
  }

  public sendAudio(blob: Blob, voice = 'Lupe'): Observable<AudioChatResponse> {
    const formData = new FormData();
    formData.append('sessionId', this.sessionId);
    formData.append('voice', voice);
    formData.append('file', blob, 'audio.webm');

    return this.http.post<AudioChatResponse>(`${this.TRANSCRIBE_API_URL}`, formData);
  }
}
