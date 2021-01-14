import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {MyInfo} from '../models/my-info';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyInfoService {
  private appService: string = environment.appService;
  private myInfoEndPoint: string = this.appService + '/a/dashboard';

  constructor(private httpClient: HttpClient) { }

  myInfo(): Observable<MyInfo> {
    return this.httpClient.get<MyInfo>(this.myInfoEndPoint).pipe();
  }
}
