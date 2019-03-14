import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SchedulingComponent } from './scheduling.component';

const routes: Route[] = [
  {
    path: '',
    component: SchedulingComponent
  }
];

@NgModule({
  declarations: [SchedulingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SchedulingModule {}
