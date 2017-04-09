import { Observable } from 'rxjs/Observable';

export interface GoogleInterface {
  authenticate(googleCode: string): Observable<any>;
  isAuthenticated(accessToken: string): Observable<boolean>;
  createSpreadsheet(accessToken: string, fileName: string): Observable<any>;
  getSpreadsheetIdByName(accessToken: string, fileName: string): Observable<any>;
  appendData(accessToken: string, spreadsheetId: string, sheetName: string, values: Array<any>): Observable<any>;
}
