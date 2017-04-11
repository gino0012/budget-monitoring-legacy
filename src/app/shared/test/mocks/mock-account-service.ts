import { AccountInterface } from '../../interfaces/account-interface';

export class MockAccountService implements AccountInterface {
  addAccount = jasmine.createSpy('add account');
}
