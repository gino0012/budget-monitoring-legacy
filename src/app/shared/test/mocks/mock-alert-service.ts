import { AlertInterface } from '../../interfaces/alert-interface';

export class MockAlertService implements AlertInterface {
  show = jasmine.createSpy('alert show');
  display = jasmine.createSpy('alert display');
  hide = jasmine.createSpy('alert hide');
}
