import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { GoogleService } from './google.service';
import { GoogleApiService } from './google-api.service';
import { MockGoogleApiService } from '../../test/mocks/mock-google-api-service';
import { AlertService } from '../alert.service';
import { MockAlertService } from '../../test/mocks/mock-alert-service';

describe('GoogleService', () => {
  const mockSpreadsheetId = 'sample-spreadsheet123tsc';
  const mockAccessToken = 'sample-access-token123';
  const mockGetAccessTokenRes = {
    access_token: mockAccessToken
  };
  const mockCreateResponse = { spreadsheetId: mockSpreadsheetId };
  const mockGetSpreadsheetIdResponse = {id: 'qwerty123456'};
  const mockFileName = 'file name';
  let service: GoogleService,
    mockGoogleApiService: MockGoogleApiService,
    mockAlertService: MockAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleService,
        { provide: GoogleApiService, useClass: MockGoogleApiService },
        { provide: AlertService, useClass: MockAlertService }
      ]
    });
  });

  beforeEach(inject([GoogleService, GoogleApiService, AlertService],
    (_service_, _mockGoogleApiService_, _mockAlertService_) => {
      service = _service_;
      mockGoogleApiService = _mockGoogleApiService_;
      mockAlertService = _mockAlertService_;

      mockGoogleApiService.getAccessToken.and.returnValue(Observable.of(JSON.stringify(mockGetAccessTokenRes)));
      mockGoogleApiService.isAuthenticated.and.returnValue(Observable.of(true));
      mockGoogleApiService.createSpreadsheet.and.returnValue(Observable.of(mockCreateResponse));
      mockGoogleApiService.getSpreadSheetIdByName.and.returnValue(Observable.of(mockGetSpreadsheetIdResponse));
      mockGoogleApiService.append.and.returnValue(Observable.of(mockCreateResponse));
    }));

  describe('authenticate(googleUser)', () => {
    const mockGoogleCode = 'sample-google-code123';
    let authSuccessSpy, authFailedSpy;

    beforeEach(() => {
      authSuccessSpy = jasmine.createSpy('auth success');
      authFailedSpy = jasmine.createSpy('auth failed');
    });

    it('should get access token', () => {
      service.authenticate(mockGoogleCode).subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleApiService.getAccessToken).toHaveBeenCalledWith(mockGoogleCode);
      expect(authSuccessSpy).toHaveBeenCalledWith(JSON.stringify(mockGetAccessTokenRes));
      expect(authFailedSpy).not.toHaveBeenCalled();
    });

    it('should not get access token when code is null', () => {
      const errorMessage = {
        error: 'Unable to login',
        error_description: 'google code is null'
      };

      service.authenticate(null).subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleApiService.getAccessToken).not.toHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith(errorMessage.error + ': ' + errorMessage.error_description);
      expect(authSuccessSpy).not.toHaveBeenCalled();
      expect(authFailedSpy).toHaveBeenCalledWith(errorMessage);
    });

    it('should alert error when error occurred', () => {
      const errorMessage = {
        error: 'Invalid Grant'
      };
      mockGoogleApiService.getAccessToken.and.returnValue(Observable.throw(JSON.stringify(errorMessage)));

      service.authenticate(mockGoogleCode).subscribe(authSuccessSpy, authFailedSpy);

      expect(mockGoogleApiService.getAccessToken).toHaveBeenCalledWith(mockGoogleCode);
      expect(mockAlertService.show).toHaveBeenCalledWith(errorMessage.error);
      expect(authSuccessSpy).not.toHaveBeenCalled();
      expect(authFailedSpy).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('isAuthenticated(accessToken)', () => {
    let isAuthSuccessSpy, isAuthFailedSpy;

    beforeEach(() => {
       isAuthSuccessSpy = jasmine.createSpy('is authenticated success');
       isAuthFailedSpy = jasmine.createSpy('is authenticated failed');
    });

    it('should check if authenticated', () => {
      service.isAuthenticated(mockAccessToken)
        .subscribe(isAuthSuccessSpy, isAuthFailedSpy);

      expect(mockGoogleApiService.isAuthenticated).toHaveBeenCalledWith(mockAccessToken);
      expect(isAuthSuccessSpy).toHaveBeenCalledWith(true);
      expect(isAuthFailedSpy).not.toHaveBeenCalled();
    });

    it('should check if not authenticated when access token is null', () => {
      service.isAuthenticated(null)
        .subscribe(isAuthSuccessSpy, isAuthFailedSpy);

      expect(mockGoogleApiService.isAuthenticated).not.toHaveBeenCalled();
      expect(isAuthSuccessSpy).not.toHaveBeenCalled();
      expect(isAuthFailedSpy).toHaveBeenCalledWith(false);
    });
  });

  describe('createSpreadsheet', () => {
    let createSuccessSpy, createFailedSpy;

    beforeEach(() => {
       createSuccessSpy = jasmine.createSpy('create spreadsheet success');
       createFailedSpy = jasmine.createSpy('create spreadsheet failed');
    });

    it('should create spreadsheet', () => {
      service.createSpreadsheet(mockAccessToken, mockFileName)
        .subscribe(createSuccessSpy, createFailedSpy);

      expect(mockGoogleApiService.createSpreadsheet).toHaveBeenCalledWith(mockAccessToken, mockFileName);
      expect(createSuccessSpy).toHaveBeenCalledWith(mockCreateResponse);
      expect(createFailedSpy).not.toHaveBeenCalled();
    });

    it('should not create spreadsheet when access token is null', () => {
      const errorMsg = {
        error: 'Unable to create spreadsheet',
        error_description: 'access token is null'
      };

      service.createSpreadsheet(null, mockFileName).subscribe(createSuccessSpy, createFailedSpy);

      expect(mockGoogleApiService.isAuthenticated).not.toHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith(errorMsg.error + ': ' + errorMsg.error_description);
      expect(createSuccessSpy).not.toHaveBeenCalled();
      expect(createFailedSpy).toHaveBeenCalledWith(errorMsg);
    });
  });

  describe('getSpreadsheetIdByName(accessToken, fileName)', () => {
    let getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy;

    beforeEach(() => {
       getSpreadsheetIdSuccessSpy = jasmine.createSpy('get spreadsheet id success');
       getSpreadsheetIdFailedSpy = jasmine.createSpy('get spreadsheet id failed');
    });

    it('should get spreadsheet id', () => {
      service.getSpreadsheetIdByName(mockAccessToken, mockFileName)
        .subscribe(getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy);

      expect(mockGoogleApiService.getSpreadSheetIdByName).toHaveBeenCalledWith(mockAccessToken, mockFileName);
      expect(getSpreadsheetIdSuccessSpy).toHaveBeenCalledWith(mockGetSpreadsheetIdResponse);
      expect(getSpreadsheetIdFailedSpy).not.toHaveBeenCalled();
    });

    it('should not get spreadsheet id when access token is null', () => {
      service.getSpreadsheetIdByName(null, mockFileName)
        .subscribe(getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy);

      expectFailedSpy();
    });

    it('should not get spreadsheet id when file name is null', () => {
      service.getSpreadsheetIdByName(mockAccessToken, null)
        .subscribe(getSpreadsheetIdSuccessSpy, getSpreadsheetIdFailedSpy);

      expectFailedSpy();
    });

    function expectFailedSpy() {
      const mockErrorRes = {
        error: 'Unable to get spreadsheet id',
        error_description: 'access token or file name is null'
      };

      expect(mockGoogleApiService.getSpreadSheetIdByName).not.toHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith(mockErrorRes.error + ': ' + mockErrorRes.error_description);
      expect(getSpreadsheetIdSuccessSpy).not.toHaveBeenCalled();
      expect(getSpreadsheetIdFailedSpy).toHaveBeenCalledWith(mockErrorRes);
    }
  });

  describe('appendData', () => {
    const mockSheetName = 'name';
    const mockValues = [1, 2, 3];
    let appendDataSuccessSpy, appendDataFailedSpy;

    beforeEach(() => {
       appendDataSuccessSpy = jasmine.createSpy('append data success');
       appendDataFailedSpy = jasmine.createSpy('append data failed');
    });

    it('should append data to workbook', () => {
      service.appendData(mockAccessToken, mockSpreadsheetId, mockSheetName, mockValues)
        .subscribe(appendDataSuccessSpy, appendDataFailedSpy);

      expect(mockGoogleApiService.append).toHaveBeenCalledWith(
        mockAccessToken,
        mockSpreadsheetId,
        mockSheetName,
        mockValues
      );
      expect(appendDataSuccessSpy).toHaveBeenCalledWith(mockCreateResponse);
      expect(appendDataFailedSpy).not.toHaveBeenCalled();
    });

    it('should not append data when access token is null', () => {
      const mockErrorRes = {
        error: 'Unable to append data to workbook',
        error_description: 'access token is null'
      };

      service.appendData(null, mockSpreadsheetId, mockSheetName, mockValues)
        .subscribe(appendDataSuccessSpy, appendDataFailedSpy);

      expect(mockGoogleApiService.append).not.toHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith(mockErrorRes.error + ': ' + mockErrorRes.error_description);
      expect(appendDataSuccessSpy).not.toHaveBeenCalled();
      expect(appendDataFailedSpy).toHaveBeenCalledWith(mockErrorRes);
    });
  });
});
