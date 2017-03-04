import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { UserDataService } from './user-data.service';
import { GoogleService } from './google/google.service';

describe('UserDataService', () => {
  const mockAccessToken = {
    access_token: 'sample-access-token123'
  };
  const mockResAuthToken = {
      issued_to: 'sample-issued.apps.googleusercontent.com',
      audience: 'sample-audience.apps.googleusercontent.com',
      user_id: '1234567890',
      scope: 'https://www.googleapis.com/auth/plus.me',
      expires_in: 12345,
      email: 'sample.email@gmail.com',
      verified_email: true,
      access_type: 'offline'
  };
  let mockGoogleService, mockRouter;

  beforeEach(() => {
    mockGoogleService = {
      authenticate: jasmine.createSpy('authenticate').and.returnValue(Observable.of(JSON.stringify(mockAccessToken)));
      isAuthenticated: jasmine.createSpy('is authenticated').and.returnValue(Observable.of(mockResAuthToken));
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate');
    };

    TestBed.configureTestingModule({
      providers: [UserDataService,
        { provide: GoogleService, useValue: mockGoogleService }
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('login(googleUser)', () => {
    let mockGoogleUser;

    beforeEach(() => {
      mockGoogleUser = {
        code: 'sample-google-code123'
      };
    });

    it('should login when google code is not null', inject([UserDataService], (service: UserDataService) => {
      service.login(mockGoogleUser);

      expect(mockGoogleService.authenticate).toHaveBeenCalledWith(mockGoogleUser.code);
      expect(localStorage.getItem('access_token')).toBe(mockAccessToken.access_token);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    }));

    it('should login when google code is not null', inject([UserDataService], (service: UserDataService) => {
      mockGoogleUser.code = null;
      service.login(mockGoogleUser);

      expect(mockGoogleService.authenticate).not.toHaveBeenCalled();
      expect(localStorage.getItem('access_token')).toBe(null);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    }));
  });

  describe('isLogin()', () => {
    let authSuccessSpy, authFailedSpy;

    beforeEach(() => {
      authSuccessSpy = jasmine.createSpy('auth success');
      authFailedSpy = jasmine.createSpy('auth failed');
    });

    it('should check if already login', inject([UserDataService], (service: UserDataService) => {
      localStorage.setItem('access_token', mockAccessToken.access_token);

      service.isLogin().subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleService.isAuthenticated).toHaveBeenCalledWith(mockAccessToken.access_token);
      expect(authSuccessSpy).toHaveBeenCalledWith(true);
      expect(authFailedSpy).not.toHaveBeenCalled();
    }));

    it('should check if not login when no saved access token', inject([UserDataService], (service: UserDataService) => {
      service.isLogin().subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleService.isAuthenticated).not.toHaveBeenCalled();
      expect(authSuccessSpy).not.toHaveBeenCalled();
      expect(authFailedSpy).toHaveBeenCalledWith(false);
    }));
  });
});
