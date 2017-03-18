import { Injectable } from '@angular/core';

import { GoogleService } from './google/google.service';
import { UserDataService } from './user-data.service';
import { Constants } from '../constants/constants';

@Injectable()
export class BudgetService {

  constructor(private googleService: GoogleService,
              private userService: UserDataService,
              private constants: Constants) { }

  initializeDataOnStartup() {
    const accessToken = this.userService.getAccessToken();

    return this.googleService.getSpreadsheetIdByName(accessToken, this.constants.DATA_FILE_NAME)
      .map(res => {
        if (!res['id']) {
          this.googleService.createSpreadsheet(accessToken).subscribe(() => {});
        }
      });
  }
}
