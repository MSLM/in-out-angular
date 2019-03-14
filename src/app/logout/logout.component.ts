import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '../services/auth.service';

@Component({
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private readonly auth: Auth, private readonly router: Router) {}

  ngOnInit() {
    this.auth.logout();
    this.router.navigate(['']);
  }
}
