import { Injectable } from '@angular/core';
import { LocationServiceInterface } from '../interfaces/location-service-interface';

@Injectable()
export class LocationService implements LocationServiceInterface {

  constructor() { }

  navigate(url: string) {
    window.location.href = url;
  }
}
