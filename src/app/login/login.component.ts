import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../shared/service/location.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private location: LocationService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {  }

  ngOnInit() {
    const isAuthenticated = this.route.snapshot.data['isAuthenticated'];
    this.route.queryParams.subscribe((params) => {
      if (params['code'] && !isAuthenticated) {
        this.userService.login(params);
      } else if (isAuthenticated) {
        this.router.navigate(['/home']);
      } else {
        this.location.navigate('https://accounts.google.com/o/oauth2/v2/auth' +
          '?scope=https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.readonly' +
          '&access_type=offline&include_granted_scopes=false&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin' +
          '&response_type=code&client_id=861770303263-nhmpmupmg7je2d3u76714ij8dun527up.apps.googleusercontent.com');
      }
    });
  }

}
