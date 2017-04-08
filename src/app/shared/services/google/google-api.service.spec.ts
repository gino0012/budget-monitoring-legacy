import * as _ from 'lodash';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
  Http,
  BaseRequestOptions
  RequestMethod
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { GoogleApiService } from './google-api.service';

describe('GoogleApiService', () => {
  const mockAccessToken = 'sample-access-token123';
  const mockInvalidAccessToken = 'sample-invalid-access-token123';
  const mockSpreadsheetId = 'sample-spreadsheet123tsc';
  const mockErrorResponse = {
    error: 'error',
    error_description: 'error description'
  };
  const mockFileName = 'file_name';
  let mockResponse;

  beforeEach(() => {
    mockResponse = { spreadsheetId: mockSpreadsheetId };

    TestBed.configureTestingModule({
      providers: [GoogleApiService, MockBackend, BaseRequestOptions,
        { provide: XHRBackend, useClass: MockBackend },
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  describe('getAccessToken(code)', () => {
    let authenticateSuccessSpy, authenticateFailedSpy;

    beforeEach(() => {
      authenticateSuccessSpy = jasmine.createSpy('authenticate success spy');
      authenticateFailedSpy = jasmine.createSpy('authenticate failed spy');
    });

    it('should getAccessToken',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {

      const mockResAccessToken = {access_token: mockAccessToken};
      const mockCode = 'sample-code-123';
      httpGetResponseTo(mockBackend, buildUrl(mockCode), mockResAccessToken);

      service.getAccessToken(mockCode).subscribe(authenticateSuccessSpy, authenticateFailedSpy);

      expect(authenticateSuccessSpy).toHaveBeenCalledWith(mockResAccessToken);
      expect(authenticateFailedSpy).not.toHaveBeenCalled();
    }));

    it('should not getAccessToken when invalid code',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockInvalidCode = 'sample-invalid-code-123';
        httpGetFailedResponseTo(mockBackend, buildUrl(mockInvalidCode), mockErrorResponse);

        service.getAccessToken  (mockInvalidCode).subscribe(authenticateSuccessSpy, authenticateFailedSpy);

        expect(authenticateSuccessSpy).not.toHaveBeenCalledWith();
        expect(authenticateFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
    }));

    function buildUrl(code) {
      return '/api/google/getAccessToken?code=' + code;
    }
  });

  describe('isAuthenticated(accessToken)', () => {
    let isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy;

    beforeEach(() => {
      isAuthenticatedSuccessSpy = jasmine.createSpy('authenticate success spy');
      isAuthenticatedFailedSpy = jasmine.createSpy('authenticate failed spy');
    });

    it('should check if authenticated',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
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
        const expectedUrl = '/api/google/isAuthenticated?access_token=' + mockAccessToken;
        httpGetResponseTo(mockBackend, expectedUrl, mockResAuthToken);

        service.isAuthenticated(mockAccessToken).subscribe(isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy);

        expect(isAuthenticatedSuccessSpy).toHaveBeenCalledWith(mockResAuthToken);
        expect(isAuthenticatedFailedSpy).not.toHaveBeenCalled();
      }));

    it('should check if not authenticated',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const expectedUrl = '/api/google/isAuthenticated?access_token=' + mockAccessToken;
        httpGetFailedResponseTo(mockBackend, expectedUrl, mockErrorResponse);

        service.isAuthenticated(mockAccessToken).subscribe(isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy);

        expect(isAuthenticatedSuccessSpy).not.toHaveBeenCalled();
        expect(isAuthenticatedFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
      }));
  });
  describe('getSpreadSheetIdByName(accessToken, fileName)', () => {
    let getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy;

    beforeEach(() => {
      getSpreadSheetIdSuccessSpy = jasmine.createSpy('get spreadsheet id success');
      getSpreadSheetIdFailedSpy = jasmine.createSpy('get spreadsheet id failed');
    });

    it('should get spreadsheet id by file name',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        mockResponse = {id: 'qwerty123456'};
        httpGetResponseTo(mockBackend, buildUrl(mockAccessToken, mockFileName), mockResponse);

        service.getSpreadSheetIdByName(mockAccessToken, mockFileName).subscribe(getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy);

        expect(getSpreadSheetIdSuccessSpy).toHaveBeenCalledWith(mockResponse);
        expect(getSpreadSheetIdFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not get spreadsheet id by file name when access token is invalid',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        httpGetFailedResponseTo(mockBackend, buildUrl(mockInvalidAccessToken, mockFileName), mockErrorResponse);

        service.getSpreadSheetIdByName(mockInvalidAccessToken, mockFileName)
          .subscribe(getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy);

        expect(getSpreadSheetIdSuccessSpy).not.toHaveBeenCalled();
        expect(getSpreadSheetIdFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
      }));

    function buildUrl(token, name) {
      return '/api/google/drive/getSpreadSheetIdByName?access_token=' + token +
        '&file_name=' + name;
    }
  });

  describe('createSpreadsheet', () => {
    let createSpreadSheetSuccessSpy, createSpreadSheetFailedSpy;
    beforeEach(() => {
      createSpreadSheetSuccessSpy = jasmine.createSpy('create spreadsheet success');
      createSpreadSheetFailedSpy = jasmine.createSpy('create spreadsheet failed');
    });

    it('should create spreadsheet',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        httpGetResponseTo(mockBackend, buildUrl(mockAccessToken), mockResponse);

        service.createSpreadsheet(mockAccessToken, mockFileName)
            .subscribe(createSpreadSheetSuccessSpy, createSpreadSheetFailedSpy);

        expect(createSpreadSheetSuccessSpy).toHaveBeenCalledWith(mockResponse);
        expect(createSpreadSheetFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not create spreadsheet when access token is invalid',
        inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
          httpGetFailedResponseTo(mockBackend, buildUrl(mockInvalidAccessToken), mockErrorResponse);

          service.createSpreadsheet(mockInvalidAccessToken, mockFileName)
              .subscribe(createSpreadSheetSuccessSpy, createSpreadSheetFailedSpy);

          expect(createSpreadSheetSuccessSpy).not.toHaveBeenCalled();
          expect(createSpreadSheetFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
        }));

    function buildUrl(token) {
      return '/api/google/sheets/createSpreadsheet?access_token=' + token +
        '&file_name=' + mockFileName;
    }
  });

  describe('append', () => {
    const expectedUrl = '/api/google/sheets/append';
    const mockSheetName = 'name';
    const mockValues = [1, 2, 3];
    let appendSuccessSpy, appendFailedSpy;

    beforeEach(() => {
      appendSuccessSpy = jasmine.createSpy('append success');
      appendFailedSpy = jasmine.createSpy('append failed');
    });

    it('should append to workbook',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        httpPostResponseTo(mockBackend, expectedUrl, buildBody(mockAccessToken), mockResponse);

        service.append(mockAccessToken, mockSpreadsheetId, mockSheetName, mockValues)
          .subscribe(appendSuccessSpy, appendFailedSpy);

        expect(appendSuccessSpy).toHaveBeenCalledWith(mockResponse);
        expect(appendFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not append to workbook when access token is invalid',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        httpPostFailedResponseTo(mockBackend, expectedUrl, buildBody(mockInvalidAccessToken), mockErrorResponse);

        service.append(mockInvalidAccessToken, mockSpreadsheetId, mockSheetName, mockValues)
            .subscribe(appendSuccessSpy, appendFailedSpy);

        expect(appendSuccessSpy).not.toHaveBeenCalled();
        expect(appendFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
      }));

    function buildBody(accessToken) {
      return {
        access_token: accessToken,
        spreadsheet_id: mockSpreadsheetId,
        sheet_name: mockSheetName,
        values: mockValues
      };
    }
  });

  function httpPostResponseTo(mockBackend, expectedUrl, body, response) {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Post &&
        _.isEqual(JSON.parse(connection.request.getBody()), body)) {

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(response)
        })));
      }
    });
  }

  function httpPostFailedResponseTo(mockBackend, expectedUrl, body, response) {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Post &&
        _.isEqual(JSON.parse(connection.request.getBody()), body)) {

        connection.mockError(response);
      }
    });
  }

  function httpGetResponseTo(mockBackend, expectedUrl, response) {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(response)
        })));
      }
    });
  }

  function httpGetFailedResponseTo(mockBackend, expectedUrl, response) {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        connection.mockError(response);
      }
    });
  }
});
