import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { GoogleService } from './google.service';
import { GoogleApiService } from './google-api.service';
import { UserDataService } from './user-data.service';

describe('GoogleService', () => {
  const mockAccessToken = { access_token: 'sample-access-token123'};
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
  let getAccessTokenSpy, isAuthenticatedSpy, loginSpy, navigateSpy;

  beforeEach(() => {
    compileModule(null, mockResAuthToken);
  });

  describe('authenticate(googleUser)', () => {
    let mockGoogleUser;

    it('should get access token', inject([GoogleService], (service: GoogleService) => {
      const mockGoogleCode = 'sample-google-code123';
      mockGoogleUser = {
        code: mockGoogleCode
      };

      service.authenticate(mockGoogleUser);

      expect(getAccessTokenSpy).toHaveBeenCalledWith(mockGoogleCode);
    }));

    it('should login using access token', inject([GoogleService], (service: GoogleService) => {
      const mockGoogleCode = 'sample-google-code123';
      mockGoogleUser = {code: mockGoogleCode };

      service.authenticate(mockGoogleUser);

      expect(getAccessTokenSpy).toHaveBeenCalledWith(mockGoogleCode);
      expect(loginSpy).toHaveBeenCalledWith(mockAccessToken.access_token);
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    }));

    it('should not get access token when code is null', inject([GoogleService], (service: GoogleService) => {
      mockGoogleUser = {
        code: null
      };

      service.authenticate(mockGoogleUser);

      expect(getAccessTokenSpy).not.toHaveBeenCalled();
    }));
  });

  describe('isAuthenticated(accessToken)', () => {
    it('should check if authenticated',
      inject([GoogleService], (service: GoogleService) => {
        const mockAccess = 'sample-access-token123';
        const isAuthSuccessSpy = jasmine.createSpy('is authenticated success');
        const isAuthFailedSpy = jasmine.createSpy('is authenticated failed');

        service.isAuthenticated(mockAccess).subscribe(isAuthSuccessSpy, isAuthFailedSpy);

        expect(isAuthenticatedSpy).toHaveBeenCalledWith(mockAccess);
        expect(isAuthSuccessSpy).toHaveBeenCalledWith(true);
        expect(isAuthFailedSpy).not.toHaveBeenCalled();
      }));

    // it('should check if not authenticated when invalid access token ',
    //   inject([GoogleService], (service: GoogleService) => {
    //     const mockErrorAuthToken = {
    //       error: 'error'
    //     };
    //     TestBed.resetTestingModule();
    //     compileModule(mockErrorAuthToken, null);
    //
    //     const mockAccessToken = 'sample-INVALID-access-token123';
    //     const isAuthSuccessSpy = jasmine.createSpy('is authenticated success');
    //     const isAuthFailedSpy = jasmine.createSpy('is authenticated failed');
    //
    //     console.log('hey');
    //     service.isAuthenticated(mockAccessToken).subscribe(isAuthSuccessSpy, isAuthFailedSpy);
    //
    //     expect(isAuthenticatedSpy).toHaveBeenCalledWith(mockAccessToken);
    //     expect(isAuthSuccessSpy).not.toHaveBeenCalled();
    //     expect(isAuthFailedSpy).toHaveBeenCalledWith(false);
    //   }));

    it('should check if not authenticated when access token is null',
      inject([GoogleService], (service: GoogleService) => {

        const isAuthSuccessSpy = jasmine.createSpy('is authenticated success');
        const isAuthFailedSpy = jasmine.createSpy('is authenticated failed');

        service.isAuthenticated(null).subscribe(isAuthSuccessSpy, isAuthFailedSpy);

        expect(isAuthenticatedSpy).not.toHaveBeenCalled();
        expect(isAuthSuccessSpy).not.toHaveBeenCalled();
        expect(isAuthFailedSpy).toHaveBeenCalledWith(false);
      }));
  });

  function compileModule(err, success) {
    getAccessTokenSpy = jasmine.createSpy('get Access Token').and.returnValue(Observable.of(JSON.stringify(mockAccessToken)));

    if (err) {
      isAuthenticatedSpy = jasmine.createSpy('is authenticated Token').and.returnValue(Observable.throw(err));
    } else if (success) {
     isAuthenticatedSpy = jasmine.createSpy('is authenticated Token').and.returnValue(Observable.of(success));
    }
    navigateSpy = jasmine.createSpy('navigate');
    loginSpy = jasmine.createSpy('login');
    const mockGoogleApiService = {
      getAccessToken: getAccessTokenSpy,
      isAuthenticated: isAuthenticatedSpy
    };
    const mockUserDataService = {
      login: loginSpy
    };
    const mockRouter = {
      navigate: navigateSpy
    };

    TestBed.configureTestingModule({
      providers: [
        GoogleService,
        {provide: Router, useValue: mockRouter},
        {provide: GoogleApiService, useValue: mockGoogleApiService},
        {provide: UserDataService, useValue: mockUserDataService}
      ]
    });
  }
});
