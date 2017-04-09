import { Component, OnInit, NgZone } from '@angular/core';

import { UserService } from '../shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ngZone: NgZone,
              private userService: UserService) {  }

  ngOnInit() {
    window['onSignIn'] = (user) => this.ngZone.run(() => this.userService.login(user));
  }

}
