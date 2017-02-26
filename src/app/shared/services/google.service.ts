import { Injectable } from '@angular/core';
import { GoogleApiService } from './google-api.service';

@Injectable()
export class GoogleService {
  private gApi: GoogleApiService;

  constructor(private _gApi: GoogleApiService) {
    this.gApi = _gApi;
  }

  authenticate(googleUser) {
    if (googleUser.code) {
      this.gApi.getAccessToken(googleUser.code);
    }
  }
}
