import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Auth } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public minimized: boolean = false;
  public showDashboardElements: boolean = false;
  public showModal: boolean = false;

  constructor(public readonly authService: Auth, private readonly router: Router) {}

  ngOnInit() {
    // Forces the window to scroll to top upon the NavigationEnd router event
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
