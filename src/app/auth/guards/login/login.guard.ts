import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '@auth/services/firebase/firebase.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  return new Promise<boolean>((resolve) => {
    firebaseService.onAuthStateChanged((user) => {
      if (user) {
        router.navigate(['/tasks']);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
