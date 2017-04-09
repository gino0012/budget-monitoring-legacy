import { Injectable } from '@angular/core';

import { GoogleService } from './google/google.service';
import { UserService } from './user/user.service';
import { Constants } from '../constants/constants';

@Injectable()
export class BudgetService {

  constructor(private googleService: GoogleService,
              private userService: UserService,
              private constants: Constants) { }

  initializeDataOnStartup() {
    const accessToken = this.userService.getAccessToken();
    const fileName = this.constants.DATA_FILE_NAME;

    return this.googleService.getSpreadsheetIdByName(accessToken, fileName)
      .map(res => {
        if (!res['id']) {
          this.googleService.createSpreadsheet(accessToken, fileName).subscribe(() => {});
        }
      });
  }
}
