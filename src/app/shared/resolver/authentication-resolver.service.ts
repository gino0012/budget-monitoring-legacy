import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UserDataService } from '../services/user-data.service';

@Injectable()
export class AuthenticationResolver implements Resolve<Subscription> {
  constructor(private router: Router,
              private userService: UserDataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Subscription {
    return this.userService.isLogin().subscribe(() => {
      this.router.navigate(['/home']);
    }, () => {
      this.router.navigate(['/login']);
    });
  }
}
