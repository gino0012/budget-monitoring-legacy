import { GoogleInterface } from '../../interfaces/google-interface';

export class MockGoogleService implements GoogleInterface{
  getSpreadsheetIdByName = jasmine.createSpy('getSpreadsheetIdByName');
  createSpreadsheet = jasmine.createSpy('createSpreadsheet');
  authenticate = jasmine.createSpy('authenticate');
  isAuthenticated = jasmine.createSpy('isAuthenticated');
  appendData = jasmine.createSpy('appendData');
}
