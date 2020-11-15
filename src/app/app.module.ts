import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TrialRedirectRoute } from './const/trialRedirectRoute';
import { RedirectLoadingComponent } from './components/redirect-loading/redirect-loading.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sing-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCommandListComponent } from './components/my-command-list/my-command-list.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { CookieService } from 'ngx-cookie-service';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 's',
    component: SignInComponent
  },
  {
    path: 'u/list',
    canActivate: [AuthGuardService],
    component: MyCommandListComponent
  },
  {
    path: 'u/dashboard',
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  ...TrialRedirectRoute.getInstance.trialRoutes
];

@NgModule({
  declarations: [
    AppComponent,
    RedirectLoadingComponent,
    LandingComponent,
    SignInComponent,
    DashboardComponent,
    MyCommandListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
