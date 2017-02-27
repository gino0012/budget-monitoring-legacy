import { Component, OnInit } from '@angular/core';
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

  constructor(private constants: Constants) {
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
