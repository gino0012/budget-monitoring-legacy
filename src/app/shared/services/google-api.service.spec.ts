/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import {
  HttpModule,
  Http,
  BaseRequestOptions
  RequestMethod
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';
import { GoogleApiService } from './google-api.service';

describe('GoogleApiService', () => {
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

  it('should getAccessToken',
    inject([GoogleApiService, MockBackend], (service: GoogleApiService, mockBackend) => {

    const mockAccessToken = 'sample-access-token123';
    const mockResAccessToken = {access_token: mockAccessToken};
    const mockCode = 'sample-code-123';
    const expectedUrl = '/api/google/getAccessToken?code=' + mockCode;
    const authenticateSuccessSpy = jasmine.createSpy('authenticate success spy');
    const authenticateFailedSpy = jasmine.createSpy('authenticate failed spy');
    mockBackend.connections.subscribe((connection) => {
      if (connection.request.url === expectedUrl &&
        connection.request.method === RequestMethod.Get) {

        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResAccessToken)
        })));
      }
    });

    service.getAccessToken(mockCode).subscribe(authenticateSuccessSpy, authenticateFailedSpy);

    expect(authenticateSuccessSpy).toHaveBeenCalledWith(mockResAccessToken);
    expect(authenticateFailedSpy).not.toHaveBeenCalled();
  }));
});
