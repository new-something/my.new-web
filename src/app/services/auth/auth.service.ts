import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  isAuthenticated(): Observable<boolean> {
    // TODO : Cookie 와 Jwt 를 확인하여 인증 여부를 반환하기.
    const session = this.cookieService.get('my-new-user-session');
    console.log(session);
    return new Observable<boolean>(subscriber => {
      subscriber.next(!!session);
    });
  }
}
