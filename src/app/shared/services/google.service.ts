import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GoogleApiService } from './google-api.service';
import { UserDataService } from './user-data.service';

@Injectable()
export class GoogleService {
  private gApi: GoogleApiService;
  private userData: UserDataService;

  constructor(private _gApi: GoogleApiService,
              private _ud: UserDataService,
              private _router: Router) {
    this.gApi = _gApi;
    this.userData = _ud;
  }

  authenticate(googleUser) {
    if (googleUser.code) {
      this.gApi.getAccessToken(googleUser.code).subscribe(res => {
        this.userData.login(JSON.parse(res).access_token);
        this._router.navigate(['/home']);
      });
    }
  }

  isAuthenticated(accessToken) {
    if (accessToken) {
      return this.gApi.isAuthenticated(accessToken).map(res => true)
        .catch(err => Observable.throw(false));
    }
    return Observable.throw(false);
  }
}
