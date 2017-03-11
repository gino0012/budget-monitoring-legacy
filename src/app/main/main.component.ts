declare var jQuery: any;
import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    jQuery(this.elRef.nativeElement).find('.button-collapse').sideNav();
    jQuery(this.elRef.nativeElement).find('.modal').modal();
    jQuery(this.elRef.nativeElement).find('.datepicker').pickadate();
  }

}
