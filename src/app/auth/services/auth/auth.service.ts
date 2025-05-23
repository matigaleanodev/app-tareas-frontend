import { inject, Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

import { FirebaseService } from '../firebase/firebase.service';
import { StoredUser, User } from '@shared/models/user.model';
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
        const { email } = cred.user;
        this.localStorageService.setItem<StoredUser>('user', { email: email! });
        return cred;
      })
    );
  }

  logout(): Promise<void> {
    this.localStorageService.removeItem('user');
    return this.firebaseService.logout();
  }

  getCurrentUser(): StoredUser | undefined {
    return this.localStorageService.getItem<StoredUser>('user');
  }
}
