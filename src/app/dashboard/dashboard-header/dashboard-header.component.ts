import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

import { Auth } from '../../services/auth.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input('drawer') public drawer: MatDrawer;

  constructor(public readonly auth: Auth, private readonly router: Router) {}

  navigate(routerLink: string): void {
    this.router.navigate([routerLink]);
    this.drawer.close();
  }
}
