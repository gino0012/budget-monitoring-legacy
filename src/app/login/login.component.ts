import { Component, OnInit, NgZone } from '@angular/core';

import { UserService } from '../shared/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ngZone: NgZone,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {  }

  ngOnInit() {
    window['onSignIn'] = (user) => this.ngZone.run(() => this.userService.login(user));
    const isAuthenticated = this.route.snapshot.data['isAuthenticated'];
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

}
