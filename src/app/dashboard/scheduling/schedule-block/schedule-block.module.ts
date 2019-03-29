import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { ScheduleBlockComponent } from './schedule-block.component';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ScheduleBlockComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }],
  exports: [ScheduleBlockComponent]
})
export class ScheduleBlockModule {}
