import {ConnectedApp} from './connected-app';
import {Shortcut} from './shortcut';
import {UrlRedirection} from './url-redirection';

export class MyInfo {
  connectedApps: ConnectedApp[];
  shortcuts: Shortcut[];
  urlRedirections: UrlRedirection[];

  constructor(connectedApps: ConnectedApp[], shortcuts: Shortcut[], urlRedirections: UrlRedirection[]) {
    this.connectedApps = connectedApps;
    this.shortcuts = shortcuts;
    this.urlRedirections = urlRedirections;
  }
}
