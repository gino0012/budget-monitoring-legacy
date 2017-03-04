import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { GoogleApiService } from './google-api.service';

@Injectable()
export class GoogleService {

  constructor(private gApi: GoogleApiService) { }

  authenticate(googleCode) {
    if (googleCode) {
      return this.gApi.getAccessToken(googleCode);
    }
    return Observable.throw({
      error: 'Unable to login',
      error_description: 'google code is null'
    });
  }

  isAuthenticated(accessToken) {
    if (accessToken) {
      return this.gApi.isAuthenticated(accessToken);
    }
    return Observable.throw(false);
  }
}
