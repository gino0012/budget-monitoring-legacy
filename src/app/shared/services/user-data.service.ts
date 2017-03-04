import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { GoogleService } from './google/google.service';

@Injectable()
export class UserDataService {

  constructor(private googleService: GoogleService,
              private router: Router) { }

  login(googleUser) {
    this.googleService.authenticate(googleUser.code).subscribe(res => {
      localStorage.setItem('access_token', JSON.parse(res).access_token);
      this.router.navigate(['/home']);
    });
  }

  isLogin() {
    if (localStorage.getItem('access_token') !== null &&
      localStorage.getItem('access_token') !== undefined) {
        return this.googleService.isAuthenticated(localStorage.getItem('access_token')).map(res => true);
      }
    return Observable.throw(false);
  }
}
