import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ngZone: NgZone,
              private userService: UserDataService,
              private router: Router) {
    window['onSignIn'] = (user) => ngZone.run(() => userService.login(user));
  }

  ngOnInit() {
    this.userService.isLogin().subscribe(res => {
      this.router.navigate(['/home']);
    }, () => {});
  }

}
