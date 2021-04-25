import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MyInfo} from '../models/my-info';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ConnectedApp} from '../models/connected-app';
import {Shortcut} from '../models/shortcut';
import {UrlRedirection} from '../models/url-redirection';

@Injectable({
  providedIn: 'root'
})
export class MyInfoService {
  private apiService: string = environment.appServerlessService;
  private myInfoEndPoint: string = this.apiService + '/apis/dashboard';

  constructor(private httpClient: HttpClient) { }

  myInfo(): Observable<MyInfo> {
    return this.httpClient.get<MyInfoResponse>(this.myInfoEndPoint).pipe(
      map(resp =>
        new MyInfo(
          resp.connectedApps.map(c => new ConnectedApp(c.connectedId, c.appCode, c.appName, c.appIcon, c.domain, c.description)),
          resp.shortcuts.map(s => new Shortcut(s.shortcutId, s.path, s.description, s.type, s.description, s.appIcon, s.connectedId)),
          resp.urlRedirections.map(u => new UrlRedirection(u.urlRedirectionId, u.path, u.destinationUrl))
        )
      )
    );
  }
}

interface MyInfoResponse {
  connectedApps: ConnectedAppResponse[];
  shortcuts: ShortcutResponse[];
  urlRedirections: UrlRedirectionResponse[];
}

interface ConnectedAppResponse {
  connectedId: number;
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;
}

interface ShortcutResponse {
  shortcutId: number;
  path: string;
  destinationUrl: string;
  type: string;
  description: string;
  appIcon: string;

  connectedId: number;
}

interface UrlRedirectionResponse {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;
}
