import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { BudgetService } from '../shared/services/budget.service';
import { AddNewAccountComponent } from '../shared/modals/add-new-account/add-new-account.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isInitializing: boolean;

  constructor(private budgetService: BudgetService,
              private dialog: MdDialog) {
    this.isInitializing = true;
  }

  ngOnInit() {
    this.budgetService.initializeDataOnStartup().subscribe(() => {
      this.isInitializing = false;
    });
  }

  openDialog() {
    this.dialog.open(AddNewAccountComponent);
  }
}
