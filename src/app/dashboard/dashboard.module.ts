import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';

import {
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatDividerModule
} from '@angular/material';

import { DashboardComponent, MyAccountCard } from './dashboard.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'scheduling',
        pathMatch: 'full'
      },
      {
        path: 'scheduling',
        loadChildren: './scheduling/scheduling.module#SchedulingModule'
        // This needs a guard!
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, DashboardHeaderComponent, MyAccountCard],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule
  ],
  entryComponents: [MyAccountCard]
})
export class DashboardModule {}
