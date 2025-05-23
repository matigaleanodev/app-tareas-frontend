import { Component, computed, input, output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Task } from '@shared/models/task.model';

@Component({
  selector: 'app-confirm-delete-task',
  imports: [],
  templateUrl: './confirm-delete-task.component.html',
  styleUrl: './confirm-delete-task.component.scss',

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
export class ConfirmDeleteTaskComponent {
  readonly open = input.required<boolean>();
  readonly task = input.required<Task>();

  readonly state = computed(() => {
    const open = this.open();
    return open ? 'visible' : 'hidden';
  });

  readonly cancel = output<void>();
  readonly confirm = output<void>();
}
