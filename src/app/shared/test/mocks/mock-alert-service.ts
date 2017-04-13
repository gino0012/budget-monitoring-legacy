import { AlertInterface } from '../../interfaces/alert-interface';

export class MockAlertService implements AlertInterface {
  show = jasmine.createSpy('show alert');
}
