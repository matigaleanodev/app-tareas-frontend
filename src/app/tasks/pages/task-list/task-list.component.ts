import { DatePipe } from '@angular/common';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';
import { TaskService } from '@models/services/task/task.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CreateTask, Task } from '@shared/models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, LoadingSpinnerComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly mostrarFormulario = signal<boolean>(false);

  readonly mostrarSpinner = linkedSignal<boolean>(() => this.tasks.isLoading());
  readonly textoSpinner = linkedSignal<string>(() => {
    const isLoading = this.tasks.isLoading();

    return isLoading ? 'Cargando tareas...' : '';
  });

  readonly tasks = rxResource({
    loader: () => this.taskService.getAll(),
    defaultValue: [],
  });

  readonly selectedTask = signal<Task | undefined>(undefined);

  onCreateTask(newTask: CreateTask) {
    this.spinnerForm();

    this.taskService.createTask(newTask).subscribe({
      next: (task) => {
        this.updateList(task);
        this.mostrarSpinner.set(false);
        this.mostrarFormulario.set(false);
      },
      error: (err) => {
        console.log(err);
        this.mostrarSpinner.set(false);
      },
    });
  }

  onUpdateTask(task: Task) {
    this.spinnerForm();

    this.taskService.updateTask(task).subscribe({
      next: (task) => {
        this.updateList(task);
        this.mostrarSpinner.set(false);
        this.mostrarFormulario.set(false);
      },
      error: (err) => {
        console.log(err);
        this.mostrarSpinner.set(false);
      },
    });
  }

  private updateList(task: Task) {
    const currentTasks = [...this.tasks.value()];
    const index = currentTasks.findIndex(({ id }) => id === task.id);

    if (index >= 0) {
      currentTasks[index] = task;
    } else {
      currentTasks.push(task);
    }

    this.tasks.set(currentTasks);
  }

  spinnerForm() {
    this.textoSpinner.set('Guardando tarea...');
    this.mostrarSpinner.set(true);
  }

  onNewTask() {
    this.mostrarFormulario.set(true);
  }

  onEditTask(task: Task) {
    this.selectedTask.set(task);
    this.mostrarFormulario.set(true);
  }

  onCancel() {
    this.selectedTask.set(undefined);
    this.mostrarFormulario.set(false);
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
