import { Component, OnInit } from '@angular/core';

import { BudgetService } from '../shared/services/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isInitializing: boolean;

  constructor(private budgetService: BudgetService) {
    this.isInitializing = true;
  }

  ngOnInit() {
    this.budgetService.initializeDataOnStartup().subscribe(() => {
      this.isInitializing = false;
    });
  }

}
