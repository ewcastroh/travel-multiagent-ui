import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chat-message/chat-message.component';
import { TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message, SenderType } from '@models/message.model';
import { TravelPlannerService } from '@services/index';
import { TravelPlanResponseDto } from '@models/index';
import { isSimpleTextResponse, isTravelPlanResponse } from 'app/utils/type-validators';

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
      senderType: SenderType.AGENT
    }
  ]);

  public isLoading = signal<boolean>(false);
  public SenderType = SenderType;
  result?: TravelPlanResponseDto;

  constructor(private travelPlannerService: TravelPlannerService) {}

  public handleMessage(message: string): void {
    console.log({ message });
    this.isLoading.set(true);
    this.updateMessagesList(message, SenderType.USER);

    this.travelPlannerService.chat(message).subscribe(
      (response) => {
        this.isLoading.set(false);
        console.log({ response });

        if (isSimpleTextResponse(response)) {
          console.log('Received Simple Text Response:', response.message);
          this.updateMessagesList(response.message, SenderType.AGENT);
        } else if (isTravelPlanResponse(response)) {
          console.log('Received Travel Plan Response:', response);
          this.result = response;
        } else {
          console.warn('Received unexpected response type:', response);
          // Handle unexpected response
        }
      }
    );
  }

  private updateMessagesList(text: string, senderType: SenderType): void {
    this.messages.update((previousMessages) => [
      ...previousMessages,
      {
        id: (previousMessages.length + 1).toString(),
        text,
        senderType
      } as Message,
    ]);
  }
}
