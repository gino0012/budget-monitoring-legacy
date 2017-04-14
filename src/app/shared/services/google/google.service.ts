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
    if (googleCode) {
      return this.gApi.getAccessToken(googleCode).map(res => res).catch(err => {
        const error = JSON.parse(err);
        this.alertService.show(error.error);
        return Observable.throw(error);
      });
    }
    const errorMessage = {
      error: 'Unable to login',
      error_description: 'google code is null'
    };
    this.alertService.show(errorMessage.error + ': ' + errorMessage.error_description);
    return Observable.throw(errorMessage);
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
