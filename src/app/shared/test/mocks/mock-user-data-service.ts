import { UserDataInterface } from '../../interfaces/user-data-interface';

export class MockUserDataService implements UserDataInterface {
  setAccessToken = jasmine.createSpy('setAccessToken');
  getAccessToken = jasmine.createSpy('getAccessToken');
  setDataId = jasmine.createSpy('setDataId');
  getDataId = jasmine.createSpy('getDataId');
}
