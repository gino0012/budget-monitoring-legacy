import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GoogleService {
  private http: Http;

  constructor(private _http: Http) {
    this.http = _http;
  }

  authenticate(googleUser) {
    this.http.get('/api/google/getAccessToken?code=' + googleUser.code)
    .map(res => res.json())
    .subscribe(res => console.log(JSON.parse(res).access_token));
  }
}
