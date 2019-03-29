import { Component, ChangeDetectorRef, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Auth } from '../services/auth.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    public readonly changeDetectorRef: ChangeDetectorRef,
    public readonly media: MediaMatcher,
    private readonly dialog: MatDialog,
    private readonly auth: Auth
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
  }

  public mobileQuery: MediaQueryList;

  public header: string = '';

  private mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.header = 'Hello ' + this.auth.getUser().fname;
  }

  showAccountCard(): void {
    this.dialog.open(MyAccountCard, {
      autoFocus: false,
      id: 'my-account-card-dialog-container',
      position: {
        right: '25px',
        top: '65px'
      }
    });
  }
}

@Component({
  templateUrl: './my-account-card/my-account-card.component.html',
  styleUrls: ['./my-account-card/my-account-card.component.scss']
})
export class MyAccountCard {
  public firstName: string = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  constructor(
    public readonly auth: Auth,
    private readonly router: Router,
    public readonly dialogRef: MatDialogRef<MyAccountCard>,
    @Inject(MAT_DIALOG_DATA) public readonly data: any
  ) {}

  @Output()
  toggleHamburger: EventEmitter<any> = new EventEmitter();

  handleProfileCardClick(route: '/logout') {
    this.router.navigate([route]);
    this.dialogRef.close();
  }
}
