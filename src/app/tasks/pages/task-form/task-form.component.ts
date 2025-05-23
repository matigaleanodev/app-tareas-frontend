import { Component, effect, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateTask, Task } from '@shared/models/task.model';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  readonly task = input<Task>();

  readonly createTask = output<CreateTask>();
  readonly updateTask = output<Task>();
  readonly cancelar = output<void>();

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  constructor() {
    effect(() => {
      const task = this.task();
      if (task) this.form.patchValue(task);
      else this.form.reset();
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.getRawValue();
    const task = this.task();

    if (task) {
      const updatedTask: Task = { ...task, ...formData };
      this.updateTask.emit(updatedTask);
    } else {
      this.createTask.emit(formData);
    }
  }

  onCancel() {
    this.cancelar.emit();
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }
}
