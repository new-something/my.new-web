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
  private appService = environment.appService;

  constructor(private httpClient: HttpClient) { }

  public saveShortcut(connectedId: number, providedActionId: number, shortcutKeyword: string): Observable<Shortcut> {
    const url = this.appService + '/apis/shortcuts';
    return this.httpClient.post<ShortcutCreateResponse>(url, {connectedId, providedActionId, shortcutKeyword}).pipe(
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
