/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  BaseRequestOptions
  RequestMethod
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { GoogleService } from './google.service';

describe('GoogleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GoogleService, MockBackend, BaseRequestOptions,
        { provide: XHRBackend, useClass: MockBackend },
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

/*
  it('should authenticate',
    inject([GoogleService, MockBackend], (service: GoogleService, mockBackend) => {

    const mockAccessToken = 'sample-access-token123';
    const mockCode = 'sample-code-123';
    const mockGoogleUser = {
      code: mockCode
    };
    const expectedUrl = '/api/google/getAccessToken?code=' + mockCode;
    let authenticateSuccessSpy = jasmine.createSpy('authenticate success spy');
    let authenticateFailedSpy = jasmine.createSpy('authenticate failed spy');
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify({access_token: mockAccessToken})
        })));
      }
    });

    service.authenticate(mockGoogleUser).subscribe(authenticateSuccessSpy, authenticateFailedSpy)

    expect(authenticateSuccessSpy).toHaveBeenCalledWith(mockAccessToken);
    expect(authenticateFailedSpy).not.toHaveBeenCalled();
  }));
  it('should not authenticate',
    inject([GoogleService, MockBackend], (service: GoogleService, mockBackend) => {

    const mockError = {error: 'Invalid token'};
    const mockCode = 'sample-code-123';
    const mockGoogleUser = {code: mockCode};
    const expectedUrl = '/api/google/getAccessToken?code=' + mockCode;
    let authenticateSuccessSpy = jasmine.createSpy('authenticate success spy');
    let authenticateFailedSpy = jasmine.createSpy('authenticate failed spy');
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        //connection.mockError();

        connection.mockError(new Error('asd')));
      }
    });

    service.authenticate(mockGoogleUser).subscribe(authenticateSuccessSpy, authenticateFailedSpy)

    expect(authenticateSuccessSpy).not.toHaveBeenCalledWith();
    expect(authenticateFailedSpy).toHaveBeenCalledWith(mockError);
  }));*/
});
