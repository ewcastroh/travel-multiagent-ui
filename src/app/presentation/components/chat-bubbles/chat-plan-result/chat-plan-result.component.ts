import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Message } from '@models/index';

@Component({
  selector: 'app-chat-plan-result',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './chat-plan-result.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPlanResultComponent {

  @Input({
    required: true,
  })
  public message!: Message;

  public objectKeys = Object.keys;
}
