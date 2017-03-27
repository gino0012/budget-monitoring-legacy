import { Component, OnInit } from '@angular/core';

import { BudgetService } from '../shared/services/budget.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
