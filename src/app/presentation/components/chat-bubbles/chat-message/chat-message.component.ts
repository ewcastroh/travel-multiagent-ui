import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  imports: [CommonModule],
  templateUrl: './chat-message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input({ required: true })
  public message!: string;
   @Input({ required: true })
  public isUserMessage!: boolean;
  /*@Input({ required: true })
  public isLoading!: boolean;
  @Input({ required: true })
  public isError!: boolean;
  @Input({ required: true })
  public isAssistantMessage!: boolean;
  @Input({ required: true })
  public isSystemMessage!: boolean;
  @Input({ required: true })
  public isAssistantTyping!: boolean;
  @Input({ required: true })
  public isAssistantError!: boolean; */
}
