import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { GoogleService } from '../google/google.service';
import { UserInterface } from '../../interfaces/user-interface';

@Injectable()
export class UserService implements UserInterface{

  constructor(private googleService: GoogleService,
              private router: Router) { }

  login(googleUser): void {
    if (googleUser.code) {
      this.googleService.authenticate(googleUser.code).subscribe(res => {
        localStorage.setItem('access_token', JSON.parse(res).access_token);
        this.router.navigate(['/home']);
      });
    }
  }

  isLogin(): Observable<boolean> {
    if (this.getAccessToken() !== null && this.getAccessToken() !== undefined) {
        return this.googleService.isAuthenticated(localStorage.getItem('access_token')).map(res => true);
      }
    return Observable.throw(false);
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }
}
