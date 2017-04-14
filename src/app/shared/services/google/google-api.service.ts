import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GoogleApiServiceInterface } from '../../interfaces/google-api-service-interface';

@Injectable()
export class GoogleApiService implements GoogleApiServiceInterface {

  constructor(private http: Http) { }

  getAccessToken(code: string): Observable<any>{
    const api = '/getAccessToken?code=' + code;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  isAuthenticated(accessToken: string): Observable<any> {
    const api = '/isAuthenticated?access_token=' + accessToken;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  getSpreadSheetIdByName(accessToken: string, fileName: string): Observable<any> {
    const api = '/drive/getSpreadSheetIdByName?access_token=' + accessToken + '&file_name=' + fileName;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  createSpreadsheet(accessToken: string, fileName: string): Observable<any> {
    const api = '/sheets/createSpreadsheet?access_token=' + accessToken + '&file_name=' + fileName;
    return this.http.request(this.createPayload(RequestMethod.Get, api, null))
        .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  append(accessToken: string, spreadsheetId: string, sheetName: string, values: Array<any>): Observable<any> {
    const body = {
      access_token: accessToken,
      spreadsheet_id: spreadsheetId,
      sheet_name: sheetName,
      values: values
    };
    return this.http.request(this.createPayload(RequestMethod.Post, '/sheets/append', body))
      .map(res => res.json()).catch(err => Observable.throw(err.json()));
  }

  private createPayload(method: RequestMethod, api: string, data: any): Request {
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
