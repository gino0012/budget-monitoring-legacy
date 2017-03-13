import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GoogleService } from './google.service';
import { GoogleApiService } from './google-api.service';

describe('GoogleService', () => {
  const mockAccessToken = { access_token: 'sample-access-token123' };
  const mockCreateResponse = { spreadsheetId: 'sample-spreadsheet123tsc' };
  const mockGetSpreadsheetIdResponse = {id: 'qwerty123456'};
  let mockGoogleApiService;

  beforeEach(() => {
    mockGoogleApiService = {
      getAccessToken: jasmine.createSpy('get Access Token').and
        .returnValue(Observable.of(JSON.stringify(mockAccessToken))),
      isAuthenticated: jasmine.createSpy('is authenticated Token').and
        .returnValue(Observable.of(true)),
      createSpreadsheet: jasmine.createSpy('create spreadsheet').and
        .returnValue(Observable.of(mockCreateResponse)),
      getSpreadSheetIdByName: jasmine.createSpy('get spreadsheet id').and
        .returnValue(Observable.of(mockGetSpreadsheetIdResponse))
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

        service.isAuthenticated(mockAccess)
          .subscribe(isAuthSuccessSpy, isAuthFailedSpy);

        expect(mockGoogleApiService.isAuthenticated).toHaveBeenCalledWith(mockAccess);
        expect(isAuthSuccessSpy).toHaveBeenCalledWith(true);
        expect(isAuthFailedSpy).not.toHaveBeenCalled();
      }));

    it('should check if not authenticated when access token is null',
      inject([GoogleService], (service: GoogleService) => {
        service.isAuthenticated(null)
          .subscribe(isAuthSuccessSpy, isAuthFailedSpy);

        expect(mockGoogleApiService.isAuthenticated).not.toHaveBeenCalled();
        expect(isAuthSuccessSpy).not.toHaveBeenCalled();
        expect(isAuthFailedSpy).toHaveBeenCalledWith(false);
      }));
  });

  describe('createSpreadsheet(accessToken)', () => {
    let createSuccessSpy, createFailedSpy;

    beforeEach(() => {
       createSuccessSpy = jasmine.createSpy('create spreadsheet success');
       createFailedSpy = jasmine.createSpy('create spreadsheet failed');
    });

    it('should create spreadsheet',
      inject([GoogleService], (service: GoogleService) => {
        service.createSpreadsheet(mockAccessToken)
          .subscribe(createSuccessSpy, createFailedSpy);

        expect(mockGoogleApiService.createSpreadsheet).toHaveBeenCalledWith(mockAccessToken);
        expect(createSuccessSpy).toHaveBeenCalledWith(mockCreateResponse);
        expect(createFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not create spreadsheet when access token is null',
      inject([GoogleService], (service: GoogleService) => {
        service.createSpreadsheet(null)
          .subscribe(createSuccessSpy, createFailedSpy);

        expect(mockGoogleApiService.isAuthenticated).not.toHaveBeenCalled();
        expect(createSuccessSpy).not.toHaveBeenCalled();
        expect(createFailedSpy).toHaveBeenCalledWith({
          error: 'Unable to create spreadsheet',
          error_description: 'access token is null'
        });
      }));
  });

  describe('getSpreadsheetIdByName(accessToken, fileName)', () => {
    const mockFileName = 'file name';
    const mockErrorRes = {
      error: 'Unable to get spreadsheet id',
      error_description: 'access token or file name is null'
    };
    let getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy;

    beforeEach(() => {
       getSpreadsheetIdSuccessSpy = jasmine.createSpy('get spreadsheet id success');
       getSpreadsheetIdFailedSpy = jasmine.createSpy('get spreadsheet id failed');
    });

    it('should get spreadsheet id',
      inject([GoogleService], (service: GoogleService) => {
        service.getSpreadsheetIdByName(mockAccessToken, mockFileName)
          .subscribe(getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy);

        expect(mockGoogleApiService.getSpreadSheetIdByName).toHaveBeenCalledWith(mockAccessToken, mockFileName);
        expect(getSpreadsheetIdSuccessSpy).toHaveBeenCalledWith(mockGetSpreadsheetIdResponse);
        expect(getSpreadsheetIdFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not get spreadsheet id when access token is null',
      inject([GoogleService], (service: GoogleService) => {
        service.getSpreadsheetIdByName(null, mockFileName)
          .subscribe(getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy);

        expect(mockGoogleApiService.getSpreadSheetIdByName).not.toHaveBeenCalled();
        expect(getSpreadsheetIdSuccessSpy).not.toHaveBeenCalled();
        expect(getSpreadsheetIdFailedSpy).toHaveBeenCalledWith(mockErrorRes);
      }));

    it('should not get spreadsheet id when file name is null',
      inject([GoogleService], (service: GoogleService) => {
        service.getSpreadsheetIdByName(mockAccessToken, null)
          .subscribe(getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy);

        expect(mockGoogleApiService.getSpreadSheetIdByName).not.toHaveBeenCalled();
        expect(getSpreadsheetIdSuccessSpy).not.toHaveBeenCalled();
        expect(getSpreadsheetIdFailedSpy).toHaveBeenCalledWith(mockErrorRes);
      }));
  });
});
