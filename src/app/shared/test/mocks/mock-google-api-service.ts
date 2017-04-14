import { GoogleApiServiceInterface } from '../../interfaces/google-api-service-interface';

export class MockGoogleApiService implements GoogleApiServiceInterface {
  getAccessToken = jasmine.createSpy('get access token');
  isAuthenticated = jasmine.createSpy('is authenticated');
  getSpreadSheetIdByName = jasmine.createSpy('get spreadsheet id by name');
  createSpreadsheet = jasmine.createSpy('create spreadsheet');
  append = jasmine.createSpy('append');
}
