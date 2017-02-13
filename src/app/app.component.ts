declare var jQuery: any;
import { Component, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    jQuery(this.elRef.nativeElement).find('.button-collapse').sideNav();
    jQuery(this.elRef.nativeElement).find('.modal').modal();
    jQuery(this.elRef.nativeElement).find('.datepicker').pickadate();
  }
}
