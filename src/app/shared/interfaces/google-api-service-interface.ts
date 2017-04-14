import { Observable } from 'rxjs/Observable';

export interface GoogleApiServiceInterface {
  getAccessToken(code: string): Observable<any>;
  isAuthenticated(accessToken: string): Observable<any>;
  getSpreadSheetIdByName(accessToken: string, fileName: string): Observable<any>;
  createSpreadsheet(accessToken: string, fileName: string): Observable<any>;
  append(accessToken: string, spreadsheetId: string, sheetName: string, values: Array<any>): Observable<any>;
}
