import { LocationServiceInterface } from '../../interfaces/location-service-interface';

export class MockLocationService implements LocationServiceInterface {
  navigate = jasmine.createSpy('location service navigate');
}
