import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VoiceChatButtonComponent } from '@components/voice-chat-button/voice-chat-button.component';
import { AudioChatResponse } from '@models/audio-chat-response.model';

@Component({
  selector: 'app-text-message-box',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VoiceChatButtonComponent,
  ],
  templateUrl: './text-message-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  @Input()
  public placeholder = '';

  @Input()
  public disableCorrections = false;

  @Output()
  public messageEmitter = new EventEmitter<string>();

  @Output()
  voiceReply = new EventEmitter<AudioChatResponse>();

  @Output()
  public isLoading = new EventEmitter<boolean>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      prompt: ['', Validators.required]
    });
  }

  public handleSubmit(): void {
    if ( this.form.invalid ) return;

    const { prompt } = this.form.value;

    this.messageEmitter.emit(prompt ?? '' );
    this.form.reset();
  }
}
