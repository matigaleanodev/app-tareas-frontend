import { inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

import { FirebaseService } from '../firebase/firebase.service';
import { User } from '@shared/models/user.model';
import { from, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userService = inject(UserService);
  private readonly firebaseService = inject(FirebaseService);
  private readonly localStorageService = inject(LocalStorageService);

  auth(email: string) {
    return this.userService.auth(email);
  }

  confirmUser(email: string) {
    return this.userService.confirmUser(email);
  }

  login(customToken: string) {
    return from(this.firebaseService.signInWithCustomToken(customToken)).pipe(
      map((cred) => {
        this.localStorageService.setItem<User>('user', cred.user);
        return cred;
      })
    );
  }

  logout(): Promise<void> {
    this.localStorageService.removeItem('user');
    return this.firebaseService.logout();
  }

  getCurrentUser(): User | undefined {
    return this.localStorageService.getItem<User>('user');
  }
}
