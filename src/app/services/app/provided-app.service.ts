import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ProvidedApp} from '../../models/provided-app';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProvidedAppDetail} from '../../models/provided-app-detail';

@Injectable({
  providedIn: 'root'
})
export class ProvidedAppService {
  private appServerlessService: string = environment.apiService;

  constructor(private httpClient: HttpClient) {
  }

  findAllByTag(tag: string): Observable<ProvidedApp[]> {
    const url = this.appServerlessService + '/apis/provided-apps?tag=' + tag;
    return this.httpClient.get<ProvidedAppResponse[]>(url).pipe(
      map(data => data.map((row, idx, rows) =>
          new ProvidedApp(row.appCode, row.appName, row.appIcon, row.domain,
            row.description, row.connected, row.connectedId === 0  ? null : row.connectedId)
        )
      ));
  }

  findById(appCode: number): Observable<ProvidedAppDetail> {
    const url = this.appServerlessService + '/apis/provided-apps/' + appCode;
    return this.httpClient.get<ProvidedAppDetailResponse>(url).pipe(
      map(data => new ProvidedAppDetail(data.appCode, data.appName, data.appIcon, data.domain, data.description, data.providedActions))
    );
  }
}

interface ProvidedAppResponse {
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  connected: boolean;
  connectedId: number;
}

interface ProvidedAppDetailResponse {
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  providedActions: ProvidedActionResponse[];
}

interface ProvidedActionResponse {
  providedActionId: number;
  type: string;
  url: string;
  description: string;
}
