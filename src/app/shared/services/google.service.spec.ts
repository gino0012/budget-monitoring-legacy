import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleService } from './google.service';
import { GoogleApiService } from './google-api.service';
import { UserDataService } from './user-data.service';

describe('GoogleService', () => {
  let getAccessTokenSpy, loginSpy;

  beforeEach(() => {
    getAccessTokenSpy = jasmine.createSpy('get Access Token').and.returnValue({ subscribe: () => {} });
    loginSpy = jasmine.createSpy('login');
    const  mockGoogleApiService = {
      getAccessToken: getAccessTokenSpy
    };
    const  mockUserDataService = {
      login: loginSpy
    };

    TestBed.configureTestingModule({
      providers: [
        GoogleService,
        { provide: GoogleApiService, useValue: mockGoogleApiService },
        { provide: UserDataService, useValue: mockUserDataService }
      ]
    });
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
      mockGoogleUser = {
        code: mockGoogleCode
      };

      service.authenticate(mockGoogleUser);

      expect(getAccessTokenSpy).toHaveBeenCalledWith(mockGoogleCode);
      expect(loginSpy).toHaveBeenCalled();
    }));

    it('should not get access token when code is null', inject([GoogleService], (service: GoogleService) => {
      mockGoogleUser = {
        code: null;
      };

      service.authenticate(mockGoogleUser);

      expect(getAccessTokenSpy).not.toHaveBeenCalled();
    }));
  });
});
