import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { GoogleApiService } from './google-api.service';

@Injectable()
export class UserDataService {

  constructor(private gApi: GoogleApiService) { }

  login(accessToken) {
    localStorage.setItem('access_token', accessToken);
  }

  isLogin() {
    if (localStorage.getItem('access_token') !== null &&
      localStorage.getItem('access_token') !== undefined) {
        return this.gApi.isAuthenticated(localStorage.getItem('access_token')).map(res => true);
      }
    return Observable.throw(false);
  }

  logout() {
    localStorage.clear();
  }
}
