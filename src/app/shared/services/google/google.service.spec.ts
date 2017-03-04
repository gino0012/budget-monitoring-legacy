import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GoogleService } from './google.service';
import { GoogleApiService } from './google-api.service';
import { UserDataService } from './user-data.service';

describe('GoogleService', () => {
  const mockAccessToken = { access_token: 'sample-access-token123' };
  let mockGoogleApiService;

  beforeEach(() => {
    mockGoogleApiService = {
      getAccessToken: jasmine.createSpy('get Access Token').and.returnValue(Observable.of(JSON.stringify(mockAccessToken))),
      isAuthenticated: jasmine.createSpy('is authenticated Token').and.returnValue(Observable.of(true))
    };

    TestBed.configureTestingModule({
      providers: [
        GoogleService,
        { provide: GoogleApiService, useValue: mockGoogleApiService }
      ]
    });
  });

  describe('authenticate(googleUser)', () => {
    let authSuccessSpy, authFailedSpy;

    beforeEach(() => {
      authSuccessSpy = jasmine.createSpy('auth success');
      authFailedSpy = jasmine.createSpy('auth failed');
    });

    it('should get access token', inject([GoogleService], (service: GoogleService) => {
      const mockGoogleCode = 'sample-google-code123';

      service.authenticate(mockGoogleCode).subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleApiService.getAccessToken).toHaveBeenCalledWith(mockGoogleCode);
      expect(authSuccessSpy).toHaveBeenCalledWith(JSON.stringify(mockAccessToken));
      expect(authFailedSpy).not.toHaveBeenCalled();
    }));

    it('should not get access token when code is null', inject([GoogleService], (service: GoogleService) => {
      service.authenticate(null).subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleApiService.getAccessToken).not.toHaveBeenCalled();
      expect(authSuccessSpy).not.toHaveBeenCalled();
      expect(authFailedSpy).toHaveBeenCalledWith({
        error: 'Unable to login',
        error_description: 'google code is null'
      });
    }));
  });

  describe('isAuthenticated(accessToken)', () => {
    let isAuthSuccessSpy, isAuthFailedSpy;

    beforeEach(() => {
       isAuthSuccessSpy = jasmine.createSpy('is authenticated success');
       isAuthFailedSpy = jasmine.createSpy('is authenticated failed');
    });
    it('should check if authenticated',
      inject([GoogleService], (service: GoogleService) => {
        const mockAccess = 'sample-access-token123';

        service.isAuthenticated(mockAccess).subscribe(isAuthSuccessSpy, isAuthFailedSpy);

        expect(mockGoogleApiService.isAuthenticated).toHaveBeenCalledWith(mockAccess);
        expect(isAuthSuccessSpy).toHaveBeenCalledWith(true);
        expect(isAuthFailedSpy).not.toHaveBeenCalled();
      }));

    it('should check if not authenticated when access token is null',
      inject([GoogleService], (service: GoogleService) => {
        service.isAuthenticated(null).subscribe(isAuthSuccessSpy, isAuthFailedSpy);

        expect(mockGoogleApiService.isAuthenticated).not.toHaveBeenCalled();
        expect(isAuthSuccessSpy).not.toHaveBeenCalled();
        expect(isAuthFailedSpy).toHaveBeenCalledWith(false);
      }));
  });
});
