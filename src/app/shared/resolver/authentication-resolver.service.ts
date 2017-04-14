import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationResolver implements Resolve<Subscription> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.userService.isLogin().map(res => true).catch(() => Observable.of(false));
  }
}
