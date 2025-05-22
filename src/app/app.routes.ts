import { Routes } from '@angular/router';
import { authGuard } from '@auth/guards/auth/auth.guard';
import { loginGuard } from '@auth/guards/login/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [loginGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'tasks',
        loadComponent: () =>
          import('./tasks/pages/task-list/task-list.component').then(
            (m) => m.TaskListComponent
          ),
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
