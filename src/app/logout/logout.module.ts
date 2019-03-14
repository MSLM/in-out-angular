import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { LogoutComponent } from './logout.component';

const routes: Route[] = [
  {
    path: '',
    component: LogoutComponent
  }
];

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LogoutModule {}
