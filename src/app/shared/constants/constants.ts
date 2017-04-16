export class Constants {
  CONFIG = {
    AUTH_BASE_URL: 'https://accounts.google.com/o/oauth2/v2/auth',
    SCOPE: 'https://www.googleapis.com/auth/spreadsheets'
      + ' ' + 'https://www.googleapis.com/auth/drive.readonly'
      + ' ' + 'https://www.googleapis.com/auth/plus.me',
    ACCESS_TYPE: 'offline',
    INCLUDE_GRANTED_SCOPES: 'false',
    REDIRECT_URI: 'http://localhost:4200/login',
    RESPONSE_TYPE: 'code',
    CLIENT_ID: '861770303263-nhmpmupmg7je2d3u76714ij8dun527up.apps.googleusercontent.com'
  };
  ADD_BUDGET_ID = 'add-budget';
  DATA_FILE_NAME = 'Budget Monitoring App Data (Don\'t remove or else all data from app will be gone)';
  SHEET_NAME = {
    ACCOUNTS: 'Accounts'
  };
  AUTH_URL = this.CONFIG.AUTH_BASE_URL +
    '?scope=' + this.CONFIG.SCOPE +
    '&access_type=' + this.CONFIG.ACCESS_TYPE +
    '&include_granted_scopes=' + this.CONFIG.INCLUDE_GRANTED_SCOPES +
    '&redirect_uri=' + this.CONFIG.REDIRECT_URI +
    '&response_type=' + this.CONFIG.RESPONSE_TYPE +
    '&client_id=' + this.CONFIG.CLIENT_ID;
}
