import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { GoogleApiService } from './google-api.service';
import { GoogleInterface } from '../../interfaces/google-interface';
import { AlertService } from '../alert.service';

@Injectable()
export class GoogleService implements GoogleInterface {

  constructor(private gApi: GoogleApiService,
              private alertService: AlertService) { }

  authenticate(googleCode: string): Observable<any> {
    return this.gApi.getAccessToken(googleCode).map(res => res).catch(err => {
      let error = 'Unable to Login';
      try {
        error = JSON.parse(err);
        this.alertService.show(error['error']);
      } catch (ex) {
        this.alertService.show(error);
      }

      return Observable.throw(error);
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

    const errorMsg = {
      error: 'Unable to create spreadsheet',
      error_description: 'access token is null'
    };
    this.alertService.show(errorMsg.error + ': ' + errorMsg.error_description);
    return Observable.throw(errorMsg);
  }

  getSpreadsheetIdByName(accessToken: string, fileName: string): Observable<any> {
    if (accessToken && fileName) {
      return this.gApi.getSpreadSheetIdByName(accessToken, fileName);
    }
    const errorMsg = {
      error: 'Unable to get spreadsheet id',
      error_description: 'access token or file name is null'
    };
    this.alertService.show(errorMsg.error + ': ' + errorMsg.error_description);
    return Observable.throw(errorMsg);
  }

  appendData(accessToken: string, spreadsheetId: string, sheetName: string, values: Array<any>): Observable<any> {
    if (accessToken) {
      return this.gApi.append(accessToken, spreadsheetId, sheetName, values);
    }
    const errorMSg = {
      error: 'Unable to append data to workbook',
      error_description: 'access token is null'
    };
    this.alertService.show(errorMSg.error + ': ' + errorMSg.error_description);
    return Observable.throw(errorMSg);
  }
}
