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
  const mockErrorResponse = {
    error: 'error',
    error_description: 'error description'
  };

  beforeEach(() => {
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
      httpResponseTo(mockBackend, buildUrl(mockCode), mockResAccessToken);

      service.getAccessToken(mockCode).subscribe(authenticateSuccessSpy, authenticateFailedSpy);

      expect(authenticateSuccessSpy).toHaveBeenCalledWith(mockResAccessToken);
      expect(authenticateFailedSpy).not.toHaveBeenCalled();
    }));

    it('should not getAccessToken when invalid code',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockInvalidCode = 'sample-invalid-code-123';
        httpFailedResponseTo(mockBackend, buildUrl(mockInvalidCode), mockErrorResponse);

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
        httpResponseTo(mockBackend, expectedUrl, mockResAuthToken);

        service.isAuthenticated(mockAccessToken).subscribe(isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy);

        expect(isAuthenticatedSuccessSpy).toHaveBeenCalledWith(mockResAuthToken);
        expect(isAuthenticatedFailedSpy).not.toHaveBeenCalled();
      }));

    it('should check if not authenticated',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const expectedUrl = '/api/google/isAuthenticated?access_token=' + mockAccessToken;
        httpFailedResponseTo(mockBackend, expectedUrl, mockErrorResponse);

        service.isAuthenticated(mockAccessToken).subscribe(isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy);

        expect(isAuthenticatedSuccessSpy).not.toHaveBeenCalled();
        expect(isAuthenticatedFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
      }));
  });
  describe('getSpreadSheetIdByName(accessToken, fileName)', () => {
    const mockFileName = 'file_name';
    let getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy;

    beforeEach(() => {
      getSpreadSheetIdSuccessSpy = jasmine.createSpy('get spreadsheet id success');
      getSpreadSheetIdFailedSpy = jasmine.createSpy('get spreadsheet id failed');
    });

    it('should get spreadsheet id by file name',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockResponse = {id: 'qwerty123456'};
        httpResponseTo(mockBackend, buildUrl(mockAccessToken, mockFileName), mockResponse);

        service.getSpreadSheetIdByName(mockAccessToken, mockFileName).subscribe(getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy);

        expect(getSpreadSheetIdSuccessSpy).toHaveBeenCalledWith(mockResponse);
        expect(getSpreadSheetIdFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not get spreadsheet id by file name when access token is invalid',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        httpFailedResponseTo(mockBackend, buildUrl(mockInvalidAccessToken, mockFileName), mockErrorResponse);

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

  describe('createSpreadsheet(accessToken)', () => {
    let createSpreadSheetSuccessSpy, createSpreadSheetFailedSpy;
    beforeEach(() => {
      createSpreadSheetSuccessSpy = jasmine.createSpy('create spreadsheet success');
      createSpreadSheetFailedSpy = jasmine.createSpy('create spreadsheet failed');
    });

    it('should create spreadsheet',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockResponse = { spreadsheetId: 'sample-spreadsheet123tsc' };
        httpResponseTo(mockBackend, buildUrl(mockAccessToken), mockResponse);

        service.createSpreadsheet(mockAccessToken)
            .subscribe(createSpreadSheetSuccessSpy, createSpreadSheetFailedSpy);

        expect(createSpreadSheetSuccessSpy).toHaveBeenCalledWith(mockResponse);
        expect(createSpreadSheetFailedSpy).not.toHaveBeenCalled();
      }));

    it('should not create spreadsheet when access token is invalid',
        inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
          const mockErrorRes = {
            message: 'Request had invalid authentication credentials.',
            domain: 'global',
            reason: 'unauthorized'
          };
          httpFailedResponseTo(mockBackend, buildUrl(mockInvalidAccessToken), mockErrorRes);

          service.createSpreadsheet(mockInvalidAccessToken)
              .subscribe(createSpreadSheetSuccessSpy, createSpreadSheetFailedSpy);

          expect(createSpreadSheetSuccessSpy).not.toHaveBeenCalled();
          expect(createSpreadSheetFailedSpy).toHaveBeenCalledWith(mockErrorRes);
        }));

    function buildUrl(token) {
      return '/api/google/sheets/createSpreadsheet?access_token=' + token;
    }
  });

  function httpResponseTo(mockBackend, expectedUrl, response) {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(response)
        })));
      }
    });
  }

  function httpFailedResponseTo(mockBackend, expectedUrl, response) {
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        connection.mockError(response);
      }
    });
  }
});
