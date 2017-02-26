import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleService } from './google.service';
import { GoogleApiService } from './google-api.service';

describe('GoogleService', () => {
  let getAccessTokenSpy;

  beforeEach(() => {
    getAccessTokenSpy = jasmine.createSpy('get Access Token');
    const  mockGoogleApiService = {
      getAccessToken: getAccessTokenSpy
    };

    TestBed.configureTestingModule({
      providers: [
        GoogleService,
        { provide: GoogleApiService, useValue: mockGoogleApiService }
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

    it('should not get access token when code is null', inject([GoogleService], (service: GoogleService) => {
      mockGoogleUser = {
        code: null;
      };

      service.authenticate(mockGoogleUser);

      expect(getAccessTokenSpy).not.toHaveBeenCalled();
    }));
  });
});
