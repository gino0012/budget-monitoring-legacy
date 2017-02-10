import { Component, OnInit, ElementRef } from '@angular/core';
declare var jQuery: any;

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
    sideNav: 'Add New Budget'
  };

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    jQuery(this.elRef.nativeElement).find('.button-collapse').sideNav();
  }
}
