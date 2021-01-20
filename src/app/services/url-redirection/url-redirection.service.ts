import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {UrlRedirection} from '../../models/url-redirection';

@Injectable({
  providedIn: 'root'
})
export class UrlRedirectionService {
  private appService = environment.appService;

  constructor(private httpClient: HttpClient) { }

  public create(path: string, destinationUrl: string): Observable<UrlRedirection> {
    const url = this.appService + '/apis/url-redirections';
    return this.httpClient.post<UrlRedirectionResponse>(url, {path, destinationUrl}).pipe(
      map(resp => new UrlRedirection(resp.urlRedirectionId, resp.path, resp.destinationUrl))
    );
  }
}

interface UrlRedirectionResponse {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;
}
