import { DatePipe } from '@angular/common';
import { Component, inject, linkedSignal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth/auth.service';
import { TaskService } from '@models/services/task/task.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe, LoadingSpinnerComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly mostrarSpinner = linkedSignal(() => this.tasks.isLoading());
  readonly textoSpinner = linkedSignal(() => {
    const isLoading = this.tasks.isLoading();

    return isLoading ? 'Cargando tareas...' : '';
  });

  readonly tasks = rxResource({
    loader: () => this.taskService.getAll(),
    defaultValue: [],
  });

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
