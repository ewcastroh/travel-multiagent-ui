import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
