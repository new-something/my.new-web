import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {JwtModule} from '@auth0/angular-jwt';

import {AppComponent} from './app.component';
import {TrialRedirectRoute} from './const/trialRedirectRoute';
import {RedirectLoadingComponent} from './components/redirect-loading/redirect-loading.component';
import {LandingComponent} from './components/landing/landing.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MyCommandListComponent} from './components/my-command-list/my-command-list.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {TryFirstComponent} from './components/landing/try-first/try-first.component';
import {HeaderComponent} from './components/global/header/header.component';
import {CtaComponent} from './components/landing/cta/cta.component';
import {YouCanDoComponent} from './components/landing/you-can-do/you-can-do.component';
import {HowToUseComponent} from './components/landing/how-to-use/how-to-use.component';
import {WhyWeBuiltComponent} from './components/landing/why-we-built/why-we-built.component';
import {FooterComponent} from './components/global/footer/footer.component';
import {SignInComponent} from './components/landing/sign-in/sign-in.component';
import {GithubSignInComponent} from './components/global/github-sign-in/github-sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 's/github',
    component: GithubSignInComponent
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
    SignInComponent,
    LandingComponent,
    DashboardComponent,
    MyCommandListComponent,
    TryFirstComponent,
    HeaderComponent,
    CtaComponent,
    YouCanDoComponent,
    HowToUseComponent,
    WhyWeBuiltComponent,
    FooterComponent,
    GithubSignInComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      },
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
