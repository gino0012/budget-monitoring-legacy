/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDataService } from './user-data.service';

describe('UserDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService]
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
