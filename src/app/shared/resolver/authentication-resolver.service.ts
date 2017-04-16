import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationResolver implements Resolve<Observable<any>> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.isLogin();
  }
}
