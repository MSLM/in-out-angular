import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

import { RestService } from '../../services/rest.service';

import { environment } from '../../../environments/environment';

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public readonly passwordForm: FormGroup;

  public resetting: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly rest: RestService,
    private readonly dialog: MatDialog
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48)]],
      retypePassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(48)]]
    });
  }

  ngOnInit() {}

  resetPassword(): void {
    this.resetting = true;
    this.rest.post(`${environment.apiUrl}/user/password`, this.passwordForm.value).then(() => {
      this.dialog.open(SuccessDialog, {
        data: "Yo, I'm Data from Battlestar Galaga"
      });
    });
  }
}

@Component({
  templateUrl: './success.dialog.html',
  styleUrls: ['./success.dialog.scss']
})
export class SuccessDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: any,
    private readonly dialogRef: MatDialogRef<SuccessDialog>,
    private readonly router: Router
  ) {}

  goAway(): void {
    this.router.navigate(['/scheduling']);
    this.dialogRef.close();
  }
}
