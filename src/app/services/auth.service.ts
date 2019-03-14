import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth {
  public token: string = '';
  public expires: number = -1;
  public role: number = -1;

  private tokenIdentifier: string = 'vw_jwt_19';
  private expiresIdentifier: string = 'vw_exp_19';
  private roleIdentifier: string = 'vw_role_19';

  constructor(public readonly router: Router) {}

  loggedIn(): boolean {
    if (this.getToken() !== '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets JWT token in token behavior subject
   * @param {string} token
   */
  setToken(token: string): void {
    localStorage.setItem(this.tokenIdentifier, token);
    this.token = token;
  }

  /**
   * Returns JWT token string from token behavior subject
   * @returns {string}
   */
  getToken(): string {
    if (localStorage.getItem(this.tokenIdentifier) && localStorage.getItem(this.tokenIdentifier) !== '') {
      const expires: number = Number(localStorage.getItem(this.expiresIdentifier));
      const seconds: number = Math.floor(new Date().getTime() / 1000);

      if (seconds >= expires) {
        this.logout();
      } else {
        this.setToken(localStorage.getItem(this.tokenIdentifier));
      }
    } else {
      return '';
    }

    return this.token;
  }

  setExpires(expires: number): void {
    localStorage.setItem(this.expiresIdentifier, String(expires));
    this.expires = expires;
  }

  getExpires(): number {
    if (localStorage.getItem(this.expiresIdentifier) && localStorage.getItem(this.expiresIdentifier) !== '') {
      this.setExpires(Number(localStorage.getItem(this.expiresIdentifier)));
    }

    return this.expires;
  }

  setRole(role: number): void {
    localStorage.setItem(this.roleIdentifier, String(role));
    this.role = role;
  }

  getRole(): number {
    if (localStorage.getItem(this.roleIdentifier) && localStorage.getItem(this.roleIdentifier) !== '') {
      this.setRole(Number(localStorage.getItem(this.roleIdentifier)));
    }

    return this.role;
  }

  /**
   * Destroys the local session
   */
  logout() {
    this.setToken(null);
    this.setExpires(null);

    localStorage.removeItem(this.tokenIdentifier);
    localStorage.removeItem(this.expiresIdentifier);
  }
}
