import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GoogleApiService {
  private http: Http;

  constructor(private _http: Http) {
    this.http = _http;
  }

  getAccessToken(code) {
    return this.http.get('/api/google/getAccessToken?code=' + code)
      .map(res => res.json());
  }

  isAuthenticated(accessToken) {
    return this.http.get('/api/google/isAuthenticated?access_token=' + accessToken)
      .map(res => res.json());
  }

  getSpreadSheetIdByName(accessToken, fileName) {
    return this.http.get('/api/google/drive/getSpreadSheetIdByName?access_token=' + accessToken + '&file_name=' + fileName)
      .map(res => res.json());
  }

  createSpreadSheet(accessToken) {
    return this.http.get('/api/google/sheets/createSpreadSheet?access_token=' + accessToken)
        .map(res => res.json());
  }
}
