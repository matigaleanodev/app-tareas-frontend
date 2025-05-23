import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('debería llamar a POST /users/auth con el email y devolver el token', (done: DoneFn) => {
    const email = 'test@example.com';
    const mockResponse = { token: 'abc123' };

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.auth(email).subscribe({
      next: (res) => {
        expect(res.token).toBe('abc123');
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          `${environment.API}/users/auth`,
          { email }
        );
        done();
      },
      error: done.fail,
    });
  });

  it('debería llamar a POST /users/auth/confirm con el email y devolver el token', (done: DoneFn) => {
    const email = 'test@example.com';
    const mockResponse = { token: 'def456' };

    httpClientSpy.post.and.returnValue(of(mockResponse));

    service.confirmUser(email).subscribe({
      next: (res) => {
        expect(res.token).toBe('def456');
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          `${environment.API}/users/auth/confirm`,
          { email }
        );
        done();
      },
      error: done.fail,
    });
  });
});
