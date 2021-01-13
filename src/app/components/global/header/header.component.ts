import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;
  singleSignOutUrl = environment.singleSignOut;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  showLogin(): void{
    document.getElementById('signinPopup').classList.toggle('is-active');
  }

  logout(): void{
    localStorage.removeItem('my-new-a');
    this.isLogin = false;
    window.location.href = this.singleSignOutUrl;
  }

  checkLoginStatus(): void {
    this.authService.isAuthenticated().subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }
}
