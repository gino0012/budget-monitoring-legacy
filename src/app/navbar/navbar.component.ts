import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'Budget Monitoring';
  budgetTab = 'Budgets';
  addButton = {
    nav: 'add',
    id: 'add-budget',
    sideNav: 'Add New Budget'
  };

  constructor() { }

  ngOnInit() { }
}
