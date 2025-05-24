import { ChangeDetectionStrategy, Component, effect, ElementRef, signal, ViewChild } from '@angular/core';
import { ChatMessageComponent, ChatPlanResultComponent, TextMessageBoxComponent, TypingLoaderComponent } from '@components/index';
import { Message, SenderType } from '@models/message.model';
import { TravelPlannerService } from '@services/index';
import { TravelPlanResponseDto } from '@models/index';
import { CommonModule } from '@angular/common';
import { stringToList } from '@utils/string-utils';
import { isSimpleTextResponse, isTravelPlanResponse } from '@utils/type-validators';

@Component({
  selector: 'app-agent-page',
  imports: [
    CommonModule,
    ChatMessageComponent,
    ChatPlanResultComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './agent-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AgentPageComponent {
  @ViewChild('chatMessagesContainer')
  public chatMessagesContainer!: ElementRef<HTMLElement>;

  public messages = signal<Message[]>([
    {
      id: '1',
      text: 'Hello, how can I help you today?',
      senderType: SenderType.AGENT
    }
  ]);

  public isLoading = signal<boolean>(false);
  public SenderType = SenderType;

  public objectKeys = Object.keys;

  constructor(private travelPlannerService: TravelPlannerService) {
    effect(() => {
      this.messages();
      setTimeout(() => this.scrollToBottom(), 0);
    });
  }

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
          if (response.flights && Array.isArray(response.flights)) {
            response.flights = response.flights.flatMap(item => stringToList(item, ','));
          }
          if (response.hotels && Array.isArray(response.hotels)) {
            response.hotels = response.hotels.flatMap(item => stringToList(item, ','));
          }
          if (response.itinerary && Array.isArray(response.itinerary)) {
            response.itinerary = response.itinerary.flatMap(item => stringToList(item, 'Day'));
          }
          this.updateMessagesList('Here is your travel plan:', SenderType.AGENT, response);
        } else {
            throw new Error('Received unexpected response type', response);
        }
      }
    );
  }

  private updateMessagesList(text: string, senderType: SenderType, travelPlan?: TravelPlanResponseDto): void {
    this.messages.update((previousMessages) => [
      ...previousMessages,
      {
        id: (previousMessages.length + 1).toString(),
        text,
        senderType,
        travelPlan
      } as Message,
    ]);
    setTimeout(() => this.chatMessagesContainer.nativeElement.scrollTo(0, this.chatMessagesContainer.nativeElement.scrollHeight), 1000);
  }

  private scrollToBottom(): void {
    try {
      if (this.chatMessagesContainer?.nativeElement) {
        this.chatMessagesContainer.nativeElement.scrollTop = this.chatMessagesContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}
