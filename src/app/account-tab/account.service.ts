import { Injectable } from '@angular/core';
import { AccountInterface } from '../shared/interfaces/account-interface';
import { Observable } from 'rxjs/Observable';
import { GoogleService } from '../shared/services/google/google.service';
import { UserDataService } from '../shared/services/user/user-data.service';
import { Constants } from '../shared/constants/constants';

@Injectable()
export class AccountService implements AccountInterface {

  constructor(private googleService: GoogleService,
              private userData: UserDataService,
              private constants: Constants) { }

  addAccount(maintaining: number, initial: number, other: number): Observable<any> {
    const accessToken = this.userData.getAccessToken();
    const dataId = this.userData.getDataId();
    const sheetName = this.constants.SHEET_NAME.ACCOUNTS;
    const values = [maintaining, initial, other];

    return this.googleService.appendData(accessToken, dataId, sheetName, values)
      .map(res => res).catch(err => {
        return Observable.throw(err);
      });
  }
}
