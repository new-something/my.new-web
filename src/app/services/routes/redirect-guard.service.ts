import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService implements CanActivate{
  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!route.data.trial) {
      return false;
    }

    if (route.params.chatRoomId) {
      window.location.href = route.data.externalUrl + route.params.chatRoomId;
      return true;
    }

    window.location.href = route.data.externalUrl;
    return true;
  }
}
