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
  private apiService = environment.appServerlessService;
  private appService = environment.appService;

  constructor(private httpClient: HttpClient) { }

  public create(path: string, destinationUrl: string): Observable<UrlRedirection> {
    const url = this.apiService + '/apis/url-redirections';
    return this.httpClient.post<UrlRedirectionResponse>(url, {path, destinationUrl}).pipe(
      map(resp => new UrlRedirection(resp.urlRedirectionId, resp.path, resp.destinationUrl))
    );
  }

  public update(urlRedirectionId: number, path: string, destinationUrl: string): Observable<void> {
    const url = this.appService + '/apis/url-redirections';
    return this.httpClient.put<void>(url, {urlRedirectionId, path, destinationUrl}).pipe();
  }

  public delete(urlRedirectionId: number): Observable<void> {
    const url = this.apiService + '/apis/url-redirections/' + urlRedirectionId;
    return this.httpClient.delete<void>(url).pipe();
  }
}

interface UrlRedirectionResponse {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;
}
