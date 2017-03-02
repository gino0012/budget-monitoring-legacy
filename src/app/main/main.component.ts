declare var jQuery: any;
import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  constructor(private userService: UserDataService,
              private router: Router,
              private elRef: ElementRef) { }

  ngAfterViewInit() {
    jQuery(this.elRef.nativeElement).find('.button-collapse').sideNav();
    jQuery(this.elRef.nativeElement).find('.modal').modal();
    jQuery(this.elRef.nativeElement).find('.datepicker').pickadate();

    this.userService.isLogin().subscribe(() => {}, err => {
      this.router.navigate(['/login']);
    });
  }

}
