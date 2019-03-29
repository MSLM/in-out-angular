import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SchedulingComponent } from './scheduling.component';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { ScheduleBlockComponent } from './schedule-block/schedule-block.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScheduleBlockModule } from './schedule-block/schedule-block.module';

const routes: Route[] = [
  {
    path: '',
    component: SchedulingComponent
  }
];

@NgModule({
  declarations: [SchedulingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    ScheduleBlockModule
  ],
  providers: [{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }]
})
export class SchedulingModule {}
