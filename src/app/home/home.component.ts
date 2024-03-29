import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const isAuthenticated = this.route.snapshot.data['isAuthenticated'];
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

}
