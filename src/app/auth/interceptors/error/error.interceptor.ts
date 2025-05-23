import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        service.logout();
      }
      return throwError(() => error);
    })
  );
};
