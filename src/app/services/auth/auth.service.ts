import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelperService: JwtHelperService) { }

  isAuthenticated(): Observable<boolean> {
    const jwt = this.getCookieValue('my-new-a');
    const expired = this.jwtHelperService.isTokenExpired(jwt);
    if (!expired) {
      localStorage.setItem('my-new-a', jwt);
    }

    return new Observable<boolean>(subscriber => {
      subscriber.next(!expired);
    });
  }

  getCookieValue(name): string {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) { return parts.pop().split(';').shift(); }
  }
}
