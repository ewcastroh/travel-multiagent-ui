import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceChatButtonComponent } from './voice-chat-button.component';

describe('VoiceChatButtonComponent', () => {
  let component: VoiceChatButtonComponent;
  let fixture: ComponentFixture<VoiceChatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceChatButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceChatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
