import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _api = environment.API;

  /**
   * Hace la autenticación del usuario con su email.
   * Si el usuario ya existe, devuelve un custom token de firebase.
   * Si no existe, devuelve un flag de needsConfirmation.
   * @param email Email del usuario
   * @returns Observable con token o estado de needsConfirmation
   */
  auth(email: string) {
    return this._http.post<{ token: string }>(`${this._api}/users/auth`, {
      email,
    });
  }

  /**
   * Registra un nuevo usuario y devuelve un custom token de firebase si tiene éxito.
   * @param email Email del usuario a registrar
   * @returns Observable con el token
   */
  confirmUser(email: string) {
    return this._http.post<{ token: string }>(
      `${this._api}/users/auth/confirm`,
      {
        email,
      }
    );
  }
}
