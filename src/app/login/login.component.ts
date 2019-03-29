import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../services/auth.service';
import { RestService } from '../services/rest.service';

import { environment } from '../../environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly environment = environment;

  public loginForm: FormGroup;

  public authenticating: boolean = false;

  constructor(
    private readonly rest: RestService,
    private readonly auth: Auth,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.authenticating = true;

    this.rest
      .post(`${environment.apiUrl}/user/auth`, this.loginForm.value)
      .then(res => {
        this.auth.setToken(res.jwt);
        this.auth.setExpires(res.expires);
        this.auth.setUser({
          fname: res.user.fname,
          lname: res.user.lname
        });
        this.router.navigate(['/scheduling']);
      })
      .catch(() => {});
  }
}
