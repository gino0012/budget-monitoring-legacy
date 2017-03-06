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

      const mockAccessToken = 'sample-access-token123';
      const mockResAccessToken = {access_token: mockAccessToken};
      const mockCode = 'sample-code-123';
      const expectedUrl = '/api/google/getAccessToken?code=' + mockCode;
      httpResponseTo(mockBackend, expectedUrl, mockResAccessToken);

      service.getAccessToken(mockCode).subscribe(authenticateSuccessSpy, authenticateFailedSpy);

      expect(authenticateSuccessSpy).toHaveBeenCalledWith(mockResAccessToken);
      expect(authenticateFailedSpy).not.toHaveBeenCalled();
    }));

    it('should not getAccessToken when invalid code',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {

      const mockInvalidCode = 'sample-invalid-code-123';
      const expectedUrl = '/api/google/getAccessToken?code=' + mockInvalidCode;
      httpFailedResponseTo(mockBackend, expectedUrl, mockErrorResponse);

      service.getAccessToken(mockInvalidCode).subscribe(authenticateSuccessSpy, authenticateFailedSpy);

      expect(authenticateSuccessSpy).not.toHaveBeenCalledWith();
      expect(authenticateFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
    }));
  });

  describe('isAuthenticated(accessToken)', () => {
    let isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy;
    beforeEach(() => {
      isAuthenticatedSuccessSpy = jasmine.createSpy('authenticate success spy');
      isAuthenticatedFailedSpy = jasmine.createSpy('authenticate failed spy');
    });

    it('should check if authenticated',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockAccessToken = 'sample-access-token123';
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

      const mockAccessToken = 'sample-access-token123';
      const expectedUrl = '/api/google/isAuthenticated?access_token=' + mockAccessToken;
      httpFailedResponseTo(mockBackend, expectedUrl, mockErrorResponse);

      service.isAuthenticated(mockAccessToken).subscribe(isAuthenticatedSuccessSpy, isAuthenticatedFailedSpy);

      expect(isAuthenticatedSuccessSpy).not.toHaveBeenCalled();
      expect(isAuthenticatedFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
    }));
  });

  describe('getSpreadSheetIdByName(accessToken)', () => {
    let getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy;
    beforeEach(() => {
      getSpreadSheetIdSuccessSpy = jasmine.createSpy('get spreadsheet id success');
      getSpreadSheetIdFailedSpy = jasmine.createSpy('get spreadsheet id failed');
    });

    it('should get spreadsheet id by file name',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockAccessToken = 'sample-access-token123';
        const mockResponse = {id: "qwerty123456"};
        const expectedUrl = '/api/google/sheets/getSpreadSheetIdByName?access_token=' + mockAccessToken;
        httpResponseTo(mockBackend, expectedUrl, mockResponse);

        service.getSpreadSheetIdByName(mockAccessToken).subscribe(getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy);

        expect(getSpreadSheetIdSuccessSpy).toHaveBeenCalledWith(mockResponse);
        expect(getSpreadSheetIdFailedSpy).not.toHaveBeenCalled();
      }));

    it('should get spreadsheet id by file name',
      inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {
        const mockInvalidAccessToken = 'sample-invalid-access-token123';
        const expectedUrl = '/api/google/sheets/getSpreadSheetIdByName?access_token=' + mockInvalidAccessToken;
        httpFailedResponseTo(mockBackend, expectedUrl, mockErrorResponse);

        service.getSpreadSheetIdByName(mockInvalidAccessToken).subscribe(getSpreadSheetIdSuccessSpy, getSpreadSheetIdFailedSpy);

        expect(getSpreadSheetIdSuccessSpy).not.toHaveBeenCalled();
        expect(getSpreadSheetIdFailedSpy).toHaveBeenCalledWith(mockErrorResponse);
      }));
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
