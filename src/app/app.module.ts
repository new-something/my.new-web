import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
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
import {ConnectedAppComponent} from './components/dashboard/shortcut/connected-app/connected-app.component';
import {MyShortcutComponent} from './components/dashboard/shortcut/my-shortcut/my-shortcut.component';

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
    ConnectedAppComponent,
    MyShortcutComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
