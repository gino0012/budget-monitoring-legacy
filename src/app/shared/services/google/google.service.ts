import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { GoogleApiService } from './google-api.service';
import { GoogleInterface } from '../../interfaces/google-interface';

@Injectable()
export class GoogleService implements GoogleInterface{

  constructor(private gApi: GoogleApiService) { }

  authenticate(googleCode: string): Observable<any> {
    if (googleCode) {
      return this.gApi.getAccessToken(googleCode);
    }
    return Observable.throw({
      error: 'Unable to login',
      error_description: 'google code is null'
    });
  }

  isAuthenticated(accessToken: string): Observable<boolean> {
    if (accessToken) {
      return this.gApi.isAuthenticated(accessToken);
    }
    return Observable.throw(false);
  }

  createSpreadsheet(accessToken: string, fileName: string): Observable<any> {
    if (accessToken) {
      return this.gApi.createSpreadsheet(accessToken, fileName);
    }
    return Observable.throw({
      error: 'Unable to create spreadsheet',
      error_description: 'access token is null'
    });
  }

  getSpreadsheetIdByName(accessToken: string, fileName: string): Observable<any> {
    if (accessToken && fileName) {
      return this.gApi.getSpreadSheetIdByName(accessToken, fileName);
    }
    return Observable.throw({
      error: 'Unable to get spreadsheet id',
      error_description: 'access token or file name is null'
    });
  }

  appendData(accessToken: string, spreadsheetId: string, sheetName: string, values: Array<any>): Observable<any> {
    if (accessToken) {
      return this.gApi.append(accessToken, spreadsheetId, sheetName, values);
    }
    return Observable.throw({
      error: 'Unable to append data to workbook',
      error_description: 'access token is null'
    });
  }
}
