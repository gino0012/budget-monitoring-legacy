import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {

  constructor() { }

  login(accessToken) {
    localStorage.setItem('access_token', accessToken);
  }

  isLogin() {
    return localStorage.getItem('access_token') !== null &&
      localStorage.getItem('access_token') !== undefined;
  }

  logout() {
    localStorage.clear();
  }
}
