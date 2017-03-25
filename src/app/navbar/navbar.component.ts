import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { AddNewBudgetComponent } from '../shared/modals/add-new-budget/add-new-budget.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;

  constructor(private dialog: MdDialog) {
    this.title = 'Budget Monitoring';
  }

  ngOnInit() { }

  openDialog() {
    this.dialog.open(AddNewBudgetComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
