import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '@auth/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', [
      'auth',
      'login',
      'confirmUser',
    ]);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  it('debería marcar controles como touched si el formulario es inválido', () => {
    component.form.controls['email'].setValue('');
    component.onSubmit();
    expect(component.form.controls['email'].touched).toBeTrue();
  });

  it('debería llamar a onAuth si el formulario es válido', () => {
    spyOn<any>(component, 'onAuth');
    component.form.controls['email'].setValue('test@example.com');
    component.onSubmit();
    expect((component as any).onAuth).toHaveBeenCalledWith('test@example.com');
  });

  it('debería mostrar modal si auth falla con needsConfirmation', fakeAsync(() => {
    authServiceSpy.auth.and.returnValue(
      throwError(() => ({ error: { needsConfirmation: true } }))
    );
    component.form.controls['email'].setValue('test@example.com');
    component.onSubmit();

    tick();

    expect(component.mostrarModal()).toBeTrue();
    expect(component.mostrarSpinner()).toBeFalse();
  }));

  it('debería llamar a onLogin si auth es exitoso', fakeAsync(() => {
    authServiceSpy.auth.and.returnValue(of({ token: 'abc123' }));
    spyOn<any>(component, 'onLogin');

    component.form.controls['email'].setValue('test@example.com');
    component.onSubmit();

    tick();

    expect((component as any).onLogin).toHaveBeenCalledWith('abc123');
  }));

  it('debería esconder spinner y cerrar modal en registrarse', fakeAsync(() => {
    authServiceSpy.confirmUser.and.returnValue(of({ token: 'token123' }));
    spyOn<any>(component, 'onLogin');

    component.form.controls['email'].setValue('test@example.com');
    component.mostrarModal.set(true);
    component.registrarse();

    tick();

    expect(component.mostrarModal()).toBeFalse();
    expect((component as any).onLogin).toHaveBeenCalledWith('token123');
  }));
});
