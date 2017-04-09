import { Injectable } from '@angular/core';
import { UserDataInterface } from '../../interfaces/user-data-interface';

@Injectable()
export class UserDataService implements UserDataInterface {
  private KEY = {
    'ACCESS_TOKEN': 'access_token'
  };
  private dataId;

  constructor() { }

  setAccessToken(value: string): void {
    localStorage.setItem(this.KEY.ACCESS_TOKEN, value);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.KEY.ACCESS_TOKEN);
  }

  setDataId(value: string): void {
    this.dataId = value;
  }

  getDataId(): string {
    return this.dataId;
  }
}
