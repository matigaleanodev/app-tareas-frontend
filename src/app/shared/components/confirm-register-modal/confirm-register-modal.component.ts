import { Component, computed, input, output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-confirm-register-modal',
  imports: [],
  templateUrl: './confirm-register-modal.component.html',
  styleUrl: './confirm-register-modal.component.scss',
  animations: [
    trigger('fadeScale', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ opacity: 0, transform: 'scale(0.9)' })
        ),
      ]),
    ]),
  ],
})
export class ConfirmRegisterModalComponent {
  readonly open = input.required<boolean>();

  readonly state = computed(() => {
    const open = this.open();
    return open ? 'visible' : 'hidden';
  });

  readonly cancel = output<void>();
  readonly confirm = output<void>();
}
