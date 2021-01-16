import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {ProvidedApp} from '../../models/provided-app';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvidedAppService {
  private appService: string = environment.appService;

  constructor(private httpClient: HttpClient) {
  }

  findAllByTag(tag: string): Observable<ProvidedApp[]> {
    const url = this.appService + '/a/apps?tag=' + tag;
    return this.httpClient.get<ProvidedAppResponse[]>(url).pipe(
      map(data => data.map((row, idx, rows) =>
          new ProvidedApp(row.appCode, row.appName, row.appIcon, row.domain,
            row.description, row.connected, row.connectedId)
        )
      ));
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
