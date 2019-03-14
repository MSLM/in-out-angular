import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GestureConfig } from '@angular/material';

import { JWTService } from './services/jwt.service';
import { RestService } from './services/rest.service';

import { AppComponent } from './app.component';
import { Auth } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './register/register.module#RegisterModule'
  },
  {
    path: 'logout',
    loadChildren: './logout/logout.module#LogoutModule'
  },
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }, Auth, AuthGuard, RestService, JWTService],
  bootstrap: [AppComponent]
})
export class AppModule {}
