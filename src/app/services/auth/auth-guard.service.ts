import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let activate = false;
    this.authService.isAuthenticated().subscribe(auth => {
      activate = auth;
    });

    if (!activate) {
      this.router.navigate(['']).catch(err => console.log(err));
    }

    return activate;
  }
}
