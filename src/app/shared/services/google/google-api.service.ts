import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoogleApiService {

  constructor(private http: Http) { }

  getAccessToken(code) {
    const api = '/getAccessToken?code=' + code;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  isAuthenticated(accessToken) {
    const api = '/isAuthenticated?access_token=' + accessToken;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  getSpreadSheetIdByName(accessToken, fileName) {
    const api = '/drive/getSpreadSheetIdByName?access_token=' + accessToken + '&file_name=' + fileName;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  createSpreadsheet(accessToken, fileName) {
    const api = '/sheets/createSpreadsheet?access_token=' + accessToken + '&file_name=' + fileName;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
        .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  append(accessToken, spreadsheetId, sheetName, values) {
    const body = {
      access_token: accessToken,
      spreadsheet_id: spreadsheetId,
      sheet_name: sheetName,
      values: values
    };
    return this.http.request(this.createPayload(RequestMethod.Post, '/sheets/append', body))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  private createPayload(method, api, data): Request {
    const payload = new RequestOptions;
    payload.method = method;
    payload.url = '/api/google' + api;

    if (method === RequestMethod.Post) {
      payload.headers = new Headers({
        'Content-Type': 'application/json'
      });
      payload.body = data;
    }

    return new Request(payload);
  }
}
