import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';
import { UserService } from '../user/user.service';
import { FirebaseService } from '../firebase/firebase.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let firebaseServiceSpy: jasmine.SpyObj<FirebaseService>;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'auth',
      'confirmUser',
    ]);
    firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', [
      'signInWithCustomToken',
      'logout',
    ]);
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'setItem',
      'removeItem',
      'getItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceSpy },
        { provide: FirebaseService, useValue: firebaseServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('debería delegar auth a UserService', (done: DoneFn) => {
    const email = 'test@example.com';
    const response = { token: 'abc123' };
    userServiceSpy.auth.and.returnValue(of(response));

    service.auth(email).subscribe({
      next: (res) => {
        expect(res).toEqual(response);
        expect(userServiceSpy.auth).toHaveBeenCalledWith(email);
        done();
      },
      error: done.fail,
    });
  });

  it('debería delegar confirmUser a UserService', (done: DoneFn) => {
    const email = 'test@example.com';
    const response = { token: 'def456' };
    userServiceSpy.confirmUser.and.returnValue(of(response));

    service.confirmUser(email).subscribe({
      next: (res) => {
        expect(res).toEqual(response);
        expect(userServiceSpy.confirmUser).toHaveBeenCalledWith(email);
        done();
      },
      error: done.fail,
    });
  });

  it('login debe llamar a firebaseService y guardar user en localStorage', (done: DoneFn) => {
    const customToken = 'token123';
    const fakeCred = {
      user: { email: 'user@test.com' },
    } as unknown as UserCredential;
    firebaseServiceSpy.signInWithCustomToken.and.returnValue(of(fakeCred));
    localStorageServiceSpy.setItem.and.stub();

    service.login(customToken).subscribe({
      next: (cred) => {
        expect(firebaseServiceSpy.signInWithCustomToken).toHaveBeenCalledWith(
          customToken
        );
        expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith('user', {
          email: 'user@test.com',
        });
        expect(cred).toEqual(fakeCred);
        done();
      },
      error: done.fail,
    });
  });

  it('logout debe remover user y llamar a firebaseService.logout', async () => {
    localStorageServiceSpy.removeItem.and.stub();
    firebaseServiceSpy.logout.and.returnValue(Promise.resolve());

    await service.logout();

    expect(localStorageServiceSpy.removeItem).toHaveBeenCalledWith('user');
    expect(firebaseServiceSpy.logout).toHaveBeenCalled();
  });

  it('getCurrentUser debe devolver el usuario desde localStorage', () => {
    const storedUser = { email: 'user@test.com' };
    localStorageServiceSpy.getItem.and.returnValue(storedUser);

    const result = service.getCurrentUser();

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith('user');
    expect(result).toEqual(storedUser);
  });
});
