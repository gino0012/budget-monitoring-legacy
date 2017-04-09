import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { UserService } from './user.service';
import { GoogleService } from '../google/google.service';
import { MockGoogleService } from '../../test/mocks/mock-google-service';
import { UserDataService } from './user-data.service';
import { MockUserDataService } from '../../test/mocks/mock-user-data-service';

describe('UserService', () => {
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
  let service, mockGoogleService, mockUserDataService,  mockRouter;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [UserService,
        { provide: GoogleService, useClass: MockGoogleService },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  beforeEach(inject([UserService, GoogleService, UserDataService],
    (_service_, _mockGoogleService, _mockUserDataService_) => {
      service = _service_;
      mockGoogleService = _mockGoogleService;
      mockUserDataService = _mockUserDataService_;
    }));

  afterEach(() => {
    localStorage.clear();
  });

  describe('login', () => {
    let mockGoogleUser;

    beforeEach(() => {
      mockGoogleUser = {
        code: 'sample-google-code123'
      };
      mockGoogleService.authenticate.and.returnValue(Observable.of(JSON.stringify(mockAccessToken)));
    });

    it('should login when google code is not null', () => {
      service.login(mockGoogleUser);

      expect(mockGoogleService.authenticate).toHaveBeenCalledWith(mockGoogleUser.code);
      expect(mockUserDataService.setAccessToken).toHaveBeenCalledWith(mockAccessToken.access_token);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should not login when google code is null', () => {
      mockGoogleUser.code = null;
      service.login(mockGoogleUser);

      expect(mockGoogleService.authenticate).not.toHaveBeenCalled();
      expect(mockUserDataService.setAccessToken).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('isLogin', () => {
    let authSuccessSpy, authFailedSpy;

    beforeEach(() => {
      authSuccessSpy = jasmine.createSpy('auth success');
      authFailedSpy = jasmine.createSpy('auth failed');
      mockGoogleService.isAuthenticated.and.returnValue(Observable.of(mockResAuthToken));
    });

    it('should check if already login', () => {
      mockUserDataService.getAccessToken.and.returnValue(mockAccessToken.access_token);

      service.isLogin().subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleService.isAuthenticated).toHaveBeenCalledWith(mockAccessToken.access_token);
      expect(mockUserDataService.getAccessToken).toHaveBeenCalled();
      expect(authSuccessSpy).toHaveBeenCalledWith(true);
      expect(authFailedSpy).not.toHaveBeenCalled();
    });

    it('should check if not login when no saved access token', () => {
      service.isLogin().subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleService.isAuthenticated).not.toHaveBeenCalled();
      expect(mockUserDataService.getAccessToken).toHaveBeenCalled();
      expect(authSuccessSpy).not.toHaveBeenCalled();
      expect(authFailedSpy).toHaveBeenCalledWith(false);
    });
  });
});
