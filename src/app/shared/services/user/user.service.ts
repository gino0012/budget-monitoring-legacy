import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { GoogleService } from '../google/google.service';
import { UserInterface } from '../../interfaces/user-interface';
import { UserDataService } from './user-data.service';

@Injectable()
export class UserService implements UserInterface {

  constructor(private googleService: GoogleService,
              private userData: UserDataService,
              private router: Router) { }

  login(googleUser): void {
    if (googleUser.code) {
      this.googleService.authenticate(googleUser.code).subscribe(res => {
        this.userData.setAccessToken(JSON.parse(res).access_token);
        this.router.navigate(['/home']);
      });
    }
  }

  isLogin(): Observable<boolean> {
    const accessToken = this.userData.getAccessToken();
    if (accessToken !== null && accessToken !== undefined) {
        return this.googleService.isAuthenticated(accessToken).map(res => true);
      }
    return Observable.throw(false);
  }
}
