import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message, SenderType } from '@models/message.model';
import { TravelPlannerService } from '@services/index';

@Component({
  selector: 'app-agent-page',
  imports: [
    ChatMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './agent-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AgentPageComponent {

  public messages = signal<Message[]>([
    {
      id: '1',
      text: 'Hello, how can I help you today?',
      isUserMessage: false,
      sender: SenderType.AGENT
    },
    {
      id: '2',
      text: 'I am looking for information about your services.',
      isUserMessage: true,
      sender: SenderType.USER
    },
    {
      id: '3',
      text: 'Sure! We offer a variety of services including web development, mobile app development, and more.',
      isUserMessage: false,
      sender: SenderType.AGENT
    },
  ]);

  public isLoading = signal<boolean>(false);
  public SenderType = SenderType;

  constructor(private travelPlannerService: TravelPlannerService) {}

  public handleMessage(message: string): void {
    console.log({ message })
  }
}
