import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { TrialRedirectRoute } from './const/trialRedirectRoute';
import { RedirectLoadingComponent } from './components/redirect-loading/redirect-loading.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  ...TrialRedirectRoute.getInstance.trialRoutes
];

@NgModule({
  declarations: [
    AppComponent,
    RedirectLoadingComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
