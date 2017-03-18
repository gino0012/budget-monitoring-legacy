declare var jQuery: any;
import { Component, AfterViewInit, ElementRef } from '@angular/core';

import { BudgetService } from '../shared/services/budget.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  isInitializing: boolean;

  constructor(private elRef: ElementRef,
              private budgetService: BudgetService) {
    this.isInitializing = true;
  }

  ngAfterViewInit() {
    jQuery(this.elRef.nativeElement).find('.button-collapse').sideNav();
    jQuery(this.elRef.nativeElement).find('.modal').modal();
    jQuery(this.elRef.nativeElement).find('.datepicker').pickadate();

    this.budgetService.initializeDataOnStartup().subscribe(() => {
      this.isInitializing = false;
    });
  }

}
