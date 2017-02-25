import { Component, OnInit, NgZone } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Constants } from '../shared/constants/constants';
import { GoogleService } from '../shared/services/google.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [Constants, GoogleService]
})
export class NavbarComponent implements OnInit {
  title: string;
  budgetTab: string;
  addButton: Object;

  constructor(private constants: Constants,
              private ngZone: NgZone,
              private google: GoogleService) {
    window['onSignIn'] = (user) => ngZone.run(() => google.authenticate(user));
    this.title = 'Budget Monitoring';
    this.budgetTab = 'Budgets';
    this.addButton = {
      nav: 'add',
      id: constants.ADD_BUDGET_ID,
      sideNav: 'Add New Budget'
    };
  }

  ngOnInit() { }
}
