import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  routerUrl = environment.router;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  showLogin(): void{
    document.getElementById('signinPopup').classList.toggle('is-active');
  }

  logout(): void{
    localStorage.removeItem('my-new-a');
    this.isLogin = false;
    window.location.href = this.routerUrl;
  }

  checkLoginStatus(): void {
    this.authService.isAuthenticated().subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }
}
