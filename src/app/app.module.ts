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
import { TryFirstComponent } from './components/landing/try-first/try-first.component';
import { HeaderComponent } from './components/landing/header/header.component';
import { CtaComponent } from './components/landing/cta/cta.component';
import { YouCanDoComponent } from './components/landing/you-can-do/you-can-do.component';
import { HowToUseComponent } from './components/landing/how-to-use/how-to-use.component';
import { WhyWeBuiltComponent } from './components/landing/why-we-built/why-we-built.component';
import { FooterComponent } from './components/landing/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
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
    MyCommandListComponent,
    TryFirstComponent,
    HeaderComponent,
    CtaComponent,
    YouCanDoComponent,
    HowToUseComponent,
    WhyWeBuiltComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
