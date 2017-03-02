import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { UserDataService } from './user-data.service';
import { GoogleApiService } from './google-api.service';

xdescribe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService, GoogleApiService, Http]
    });
  });

  it('should login', inject([UserDataService], (service: UserDataService) => {
    const mockAccessToken = 'sample-access-token123';

    service.login(mockAccessToken);

    expect(localStorage.getItem('access_token')).toBe(mockAccessToken);
  }));

  it('should check if already login', inject([UserDataService], (service: UserDataService) => {
    expect(service.isLogin()).toBe(true);
  }));

  it('should logout', inject([UserDataService], (service: UserDataService) => {
    service.logout();

    expect(localStorage.getItem('access_token')).toBe(null);
  }));

});
