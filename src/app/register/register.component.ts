import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from '../services/auth.service';
import { RestService } from '../services/rest.service';

import { environment } from '../../environments/environment';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public readonly environment = environment;

  public registerForm: FormGroup;

  public registering: boolean = false;

  constructor(
    private readonly rest: RestService,
    private readonly auth: Auth,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.registering = true;

    this.rest
      .post(`${environment.apiUrl}/auth`, this.registerForm.value)
      .then(res => {
        this.auth.setToken(res.data.jwt);
        this.auth.setExpires(res.data.expires);
        this.router.navigate(['/dashboard']);
      })
      .catch(() => {
        this.registering = false;
      });
  }
}
