import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../services/user/user.service';

@Injectable()
export class AuthenticationResolver implements Resolve<Subscription> {
  constructor(private router: Router,
              private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Subscription {
    return this.userService.isLogin().subscribe(() => {
      this.router.navigate(['/home']);
    }, () => {
      this.router.navigate(['/login']);
    });
  }
}
