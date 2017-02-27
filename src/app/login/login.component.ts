import { Component, OnInit, NgZone } from '@angular/core';

import { GoogleService } from '../shared/services/google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GoogleService]
})
export class LoginComponent implements OnInit {

  constructor(private ngZone: NgZone,
              private google: GoogleService) {
    window['onSignIn'] = (user) => ngZone.run(() => google.authenticate(user));
  }

  ngOnInit() {
  }

}
