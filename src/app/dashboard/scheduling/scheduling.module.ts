import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SchedulingComponent } from './scheduling.component';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const routes: Route[] = [
  {
    path: '',
    component: SchedulingComponent
  }
];

@NgModule({
  declarations: [SchedulingComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatDatepickerModule, MatMomentDateModule],
  providers: [{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }]
})
export class SchedulingModule {}
