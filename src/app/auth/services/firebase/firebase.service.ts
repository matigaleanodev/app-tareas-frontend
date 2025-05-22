import { Injectable } from '@angular/core';
import {
  getAuth,
  signInWithCustomToken,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _firebaseApp = initializeApp(environment.firebaseConfig);
  private _auth = getAuth(this._firebaseApp);

  signInWithCustomToken(token: string): Observable<UserCredential> {
    const cred = signInWithCustomToken(this._auth, token);
    return from(cred);
  }

  logout(): Promise<void> {
    return signOut(this._auth);
  }

  async getIdToken(): Promise<string | null> {
    const user = this._auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }

  onAuthStateChanged(callback: (user: User | null) => void) {
    onAuthStateChanged(this._auth, callback);
  }
}
