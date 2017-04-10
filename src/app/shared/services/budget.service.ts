import { Injectable } from '@angular/core';

import { GoogleService } from './google/google.service';
import { Constants } from '../constants/constants';
import { UserDataService } from './user/user-data.service';

@Injectable()
export class BudgetService {

  constructor(private googleService: GoogleService,
              private userData: UserDataService,
              private constants: Constants) { }

  initializeDataOnStartup() {
    const accessToken = this.userData.getAccessToken();
    const fileName = this.constants.DATA_FILE_NAME;

    return this.googleService.getSpreadsheetIdByName(accessToken, fileName)
      .map(res => {
        const id = res['id'];
        if (!id) {
          this.googleService.createSpreadsheet(accessToken, fileName).subscribe(res => {
            this.userData.setDataId(res.spreadsheetid);
          });
        } else {
          this.userData.setDataId(id);
        }
      });
  }
}
