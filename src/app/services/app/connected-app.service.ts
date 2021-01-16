import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectedAppService {
  private appService: string = environment.appService;

  constructor(private httpClient: HttpClient) { }

  findByAppCode(connectedId: number): Observable<any> {
    const url = this.appService + '/apis/connected-apps/' + connectedId;
    return this.httpClient.get<any>(url).pipe();
  }
}
