import {Component, EventEmitter, Output, signal} from '@angular/core';
import {AudioRecordingService} from '@services/audio-recording/audio-recording.service';
import {TravelPlannerService} from '@services/travel-planner/travel-planner.service';
import {CommonModule} from '@angular/common';
import { AudioChatResponse } from '@models/index';

@Component({
  selector: 'app-voice-chat-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voice-chat-button.component.html',
  styleUrl: './voice-chat-button.component.css'
})
export class VoiceChatButtonComponent {
  public isRecording = signal(false);
  public startTime = signal<number>(0);

  @Output()
  public loading = new EventEmitter<boolean>();

  @Output()
  public audioReply = new EventEmitter<AudioChatResponse>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public intervalRef?: any;

  constructor(
    private audioService: AudioRecordingService,
    private travelPlannerService: TravelPlannerService
  ) {
  }

  public toggleRecording(): void {
    if (!this.isRecording()) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  public startRecording(): void {
    this.audioService.startRecording().then(() => {
      console.log('Recording started');
      this.isRecording.set(true);
      this.startTime.set(Date.now());
      this.startTimer();
    });
  }

  public stopRecording(): void {
    this.audioService.stopRecording().then(blob => {
      this.isRecording.set(false);
      this.stopTimer();
      this.audioService.cleanup();

      this.loading.emit(true);
      this.travelPlannerService.sendAudio(blob)
        .subscribe(response => {
          console.log('AudioChatResponse:', response);
          this.audioReply.emit(response);
          this.loading.emit(false);
          const audio = new Audio(`data:audio/mp3;base64,${response.audioBase64}`);
          audio.play();
        });
    });
  }

  public startTimer(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.intervalRef = setInterval(() => {
    }, 1000);
  }

  public stopTimer(): void {
    clearInterval(this.intervalRef);
  }
}
