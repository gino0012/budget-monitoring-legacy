import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../shared/constants/constants';
import { UserDataService } from '../shared/services/user-data.service';


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

  constructor(private constants: Constants,
              private userService: UserDataService,
              private router: Router) {
    this.title = 'Budget Monitoring';
    this.budgetTab = 'Budgets';
    this.addButton = {
      nav: 'add',
      id: constants.ADD_BUDGET_ID,
      sideNav: 'Add New Budget'
    };
  }

  ngOnInit() { }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
    location.reload();
  }
}
