import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {ConnectedApp} from '../../models/connected-app';

@Injectable({
  providedIn: 'root'
})
export class ConnectedAppService {
  private apiService = environment.appServerlessService;

  constructor(private httpClient: HttpClient) { }

  connect(appCode: number): Observable<ConnectedApp> {
    const url = this.apiService + '/apis/connected-apps';
    return this.httpClient.post<ConnectedAppResponse>(url, {appCode}).pipe(
      map(data => new ConnectedApp(data.connectedId, data.appCode, data.appName, data.appIcon, data.domain, data.description))
    );
  }

  disconnect(appCode: number): Observable<void> {
    const url = this.apiService + '/apis/connected-apps/' + appCode;
    return this.httpClient.delete<void>(url).pipe();
  }
}

interface ConnectedAppResponse {
  appCode: number;
  connectedId: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;
}
