import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../shared/service/location.service';
import { Constants } from '../shared/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private location: LocationService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private constants: Constants) {  }

  ngOnInit() {
    const isAuthenticated = this.route.snapshot.data['isAuthenticated'];
    this.route.queryParams.subscribe((params) => {
      if (params['code'] && !isAuthenticated) {
        this.userService.login(params);
      } else if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        this.location.navigate(this.constants.AUTH_URL);
      }
    });
  }

}
