import { UserInterface } from '../../interfaces/user-interface';

export class MockUserService implements UserInterface{
  login = jasmine.createSpy('login');
  isLogin = jasmine.createSpy('is login');
  getAccessToken = jasmine.createSpy('getAccessToken');
}
