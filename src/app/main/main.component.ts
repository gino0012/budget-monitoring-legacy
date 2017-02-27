import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserDataService } from '../shared/services/user-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private userService: UserDataService,
              private router: Router) { }

  ngOnInit() {
    if (!this.userService.isLogin()) {
      this.router.navigate(['/login']);
    }
  }

}
