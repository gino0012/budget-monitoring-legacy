import { GoogleApiServiceInterface } from '../../interfaces/google-api-service-interface';

export class MockGoogleApiService implements GoogleApiServiceInterface{
  getAccessToken = jasmine.createSpy('');
  isAuthenticated = jasmine.createSpy('');
  getSpreadSheetIdByName = jasmine.createSpy('');
  createSpreadsheet = jasmine.createSpy('');
  append = jasmine.createSpy('');
}
