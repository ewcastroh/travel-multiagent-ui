import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioRecordingService {
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  private audioStream!: MediaStream;

  private WEBM_MIME_TYPE = 'audio/webm';

  public async startRecording(): Promise<void> {
    this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioChunks = [];

    this.mediaRecorder = new MediaRecorder(this.audioStream, {
      mimeType: this.WEBM_MIME_TYPE
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };
    this.mediaRecorder.start();
  }

  public async stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = async () => {
        const webmBlob = new Blob(this.audioChunks, { type: this.WEBM_MIME_TYPE });
        resolve(webmBlob);
      };
      this.mediaRecorder.stop();
    });
  }

  public cleanup(): void {
    this.audioStream.getTracks().forEach(track => track.stop());
    this.audioChunks = [];
  }
}
