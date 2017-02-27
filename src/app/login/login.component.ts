import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleService } from '../shared/services/google.service';
import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GoogleService]
})
export class LoginComponent implements OnInit {

  constructor(private ngZone: NgZone,
              private google: GoogleService,
              private userService: UserDataService,
              private router: Router) {
    window['onSignIn'] = (user) => ngZone.run(() => google.authenticate(user));
  }

  ngOnInit() {
    if(this.userService.isLogin()) this.router.navigate(['/home']);
  }

}
