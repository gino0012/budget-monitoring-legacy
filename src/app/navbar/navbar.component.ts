import { Component, OnInit, NgZone } from '@angular/core';

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

  constructor(private constants: Constants, private ngZone: NgZone) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
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
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
}
