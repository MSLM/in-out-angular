import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Auth } from './auth.service';

import { JWTService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly jwt: JWTService) {}

  /**
   * Determines what features a given user can interact with
   * @return {boolean}
   */
  canActivate(): boolean {
    if (this.jwt.checkToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  /**
   * Determines what features a given user can interact with; for admins
   * @return {boolean}
   */
  canActivate(): boolean {
    if (this.auth.loggedIn() && this.auth.role >= 2) {
      return true;
    } else {
      if (!this.auth.loggedIn()) {
        this.router.navigate(['/login']);
        return false;
      }
      this.router.navigate(['/']);
      return false;
    }
  }
}
