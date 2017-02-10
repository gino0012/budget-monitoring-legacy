import { Component, OnInit, ElementRef } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  const TITLE = 'Budget Monitoring';
  const BUDGET_TAB = 'Budgets';
  const ADD_BUTTON = {
    nav: 'add',
    sideNav: 'Add New Budget'
  }

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    jQuery(this.elRef.nativeElement).find('.button-collapse').sideNav();
  }
}
