import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@auth/services/auth/auth.service';
import { ConfirmRegisterModalComponent } from '@shared/components/confirm-register-modal/confirm-register-modal.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ConfirmRegisterModalComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private service = inject(AuthService);

  form = new FormGroup({
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  readonly mostrarModal = signal<boolean>(false);
  readonly mostrarSpinner = signal<boolean>(false);
  readonly textoSpinner = signal<string>('');

  onSubmit() {
    if (this.form.valid) {
      const { email } = this.form.getRawValue();
      this.onAuth(email);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private onAuth(email: string) {
    this.textoSpinner.set('Verificando email...');
    this.mostrarSpinner.set(true);
    this.service.auth(email).subscribe({
      next: ({ token }) => {
        this.onLogin(token);
      },
      error: ({ error }) => {
        this.esconderSpinner();
        if (error.needsConfirmation) {
          this.openModal();
        }
        console.log(error);
      },
    });
  }

  private onLogin(token: string) {
    this.textoSpinner.set('Iniciando sesión...');
    this.service.login(token).subscribe({
      next: ({ user }) => {
        this.esconderSpinner();
        console.log(user);
      },
      error: (err) => {
        console.log(err);
        this.esconderSpinner();
      },
    });
  }

  private onConfirmUser(email: string) {
    this.textoSpinner.set('Registrando email...');
    this.mostrarSpinner.set(true);
    this.cerrarModal();

    this.service.confirmUser(email).subscribe({
      next: ({ token }) => {
        this.onLogin(token);
      },
      error: (err) => {
        console.log(err);
        this.esconderSpinner();
      },
    });
  }

  private esconderSpinner() {
    this.mostrarSpinner.set(false);
    this.textoSpinner.set('');
  }

  private openModal() {
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
  }

  registrarse() {
    if (this.form.valid) {
      const { email } = this.form.getRawValue();
      this.onConfirmUser(email);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
