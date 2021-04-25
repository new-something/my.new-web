import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shortcut} from '../../models/shortcut';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShortcutService {
  private apiService = environment.appServerlessService;
  private appService = environment.appService;

  constructor(private httpClient: HttpClient) { }

  public createShortcut(connectedId: number, providedActionId: number, path: string, organization: string): Observable<Shortcut> {
    const url = this.apiService + '/apis/shortcuts';
    return this.httpClient.post<ShortcutCreateResponse>(url, {connectedId, providedActionId, path, organization}).pipe(
      map(resp => new Shortcut(resp.shortcutId,
        resp.path,
        resp.destinationUrl,
        resp.type,
        resp.description,
        resp.appIcon,
        resp.connectedId
      ))
    );
  }

  public updateShortcut(shortcutId: number, path: string): Observable<void> {
    const url = this.appService + '/apis/shortcuts';
    return this.httpClient.put<void>(url, {shortcutId, path}).pipe();
  }

  public deleteShortcut(shortcutId: number): Observable<void> {
    const url = this.appService + '/apis/shortcuts/' + shortcutId;
    return this.httpClient.delete<void>(url).pipe();
  }
}

interface ShortcutCreateResponse {
  shortcutId: number;
  path: string;
  destinationUrl: string;
  type: string;
  description: string;
  appIcon: string;

  connectedId: number;
}
