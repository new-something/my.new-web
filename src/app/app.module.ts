import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';

import {AppComponent} from './app.component';
import {RedirectLoadingComponent} from './components/redirect-loading/redirect-loading.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HowToUseComponent} from './components/dashboard/how-to-use/how-to-use.component';
import {MyCommandListComponent} from './components/my-command-list/my-command-list.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {HeaderComponent} from './components/global/header/header.component';
import {FooterComponent} from './components/global/footer/footer.component';
import {ShortcutComponent} from './components/dashboard/shortcut/shortcut.component';
import {AuthInterceptor} from './interceptors/auth/auth.interceptor';
import { AppListComponent } from './components/dashboard/shortcut/modal/app-list/app-list.component';
import { AppDetailComponent } from './components/dashboard/shortcut/modal/app-detail/app-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectLoadingComponent
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
  }
];

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];

@NgModule({
  declarations: [
    AppComponent,
    RedirectLoadingComponent,
    DashboardComponent,
    HowToUseComponent,
    MyCommandListComponent,
    HeaderComponent,
    FooterComponent,
    ShortcutComponent,
    AppListComponent,
    AppDetailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('my-new-a');
        }
      },
    })
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
