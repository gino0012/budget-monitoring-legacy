import { Component, OnInit, NgZone } from '@angular/core';

import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ngZone: NgZone,
              private userService: UserDataService) {  }

  ngOnInit() {
    window['onSignIn'] = (user) => this.ngZone.run(() => this.userService.login(user));
  }

}
