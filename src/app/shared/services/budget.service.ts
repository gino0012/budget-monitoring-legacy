import { Injectable } from '@angular/core';

import { GoogleService } from './google/google.service';
import { Constants } from '../constants/constants';
import { UserDataService } from './user/user-data.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from './alert.service';

@Injectable()
export class BudgetService {

  constructor(private googleService: GoogleService,
              private userData: UserDataService,
              private constants: Constants,
              private alertService: AlertService) { }

  initializeDataOnStartup() {
    const accessToken = this.userData.getAccessToken();
    const fileName = this.constants.DATA_FILE_NAME;

    return this.googleService.getSpreadsheetIdByName(accessToken, fileName)
      .map(res => {
        const id = res['id'];
        if (!id) {
          this.googleService.createSpreadsheet(accessToken, fileName).subscribe(response => {
            this.userData.setDataId(response.spreadsheetid);
          });
        } else {
          this.userData.setDataId(id);
        }
      }).catch(err => {
        if (err.message) {
          this.alertService.show(err.message);
        } else {
          this.alertService.show('Error Initializing Data');
        }
        return Observable.throw(err);
      });
  }
}
