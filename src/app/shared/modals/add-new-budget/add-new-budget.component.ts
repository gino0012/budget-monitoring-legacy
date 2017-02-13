import { Component, OnInit } from '@angular/core';

import { Constants } from '../../constants/constants';

@Component({
  selector: 'app-add-new-budget',
  templateUrl: './add-new-budget.component.html',
  styleUrls: ['./add-new-budget.component.css'],
  providers: [Constants]
})
export class AddNewBudgetComponent implements OnInit {
  addBudgetId: string;

  constructor(private constants: Constants) {
    this.addBudgetId = constants.ADD_BUDGET_ID;
  }

  ngOnInit() { }

}
