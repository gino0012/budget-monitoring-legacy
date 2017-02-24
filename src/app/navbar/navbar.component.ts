import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Constants } from '../shared/constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [Constants]
})
export class NavbarComponent implements OnInit {
  title: string;
  budgetTab: string;
  addButton: Object;
  http: Http;

  constructor(private constants: Constants,
              private ngZone: NgZone,
              private _http: Http) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    this.http = _http;
    this.title = 'Budget Monitoring';
    this.budgetTab = 'Budgets';
    this.addButton = {
      nav: 'add',
      id: constants.ADD_BUDGET_ID,
      sideNav: 'Add New Budget'
    };
  }

  ngOnInit() { }

  onSignIn(googleUser) {
    console.log(googleUser);
    console.log(googleUser.getAuthResponse());
    this.http.post('https://accounts.google.com/o/oauth2/token',
      'code=4/gXCN77EWLDCO_fake_p2tvfakezOg6Mn0fakej2vA.giyP3fakejxeAeYFZr95uygvU3j0dumQI&client_id=104608secret-secret-secret-secret.apps.googleusercontent.com&client_secret=90V0FAKE_WkFAKExrHCZti&redirect_uri=postmessage&grant_type=authorization_code',
      {headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'})}).toPromise().then(res => {console.log(res)});
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
}
