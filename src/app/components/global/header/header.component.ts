import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  showLogin(): void{
    document.getElementById('signinPopup').classList.toggle('is-active');
  }

  logout(): void{
    localStorage.removeItem('my-new-a');
    this.router.navigate(['']).catch(err => console.log(err));
    this.isLogin = false;
  }

  checkLoginStatus(): void {
    this.authService.isAuthenticated().subscribe(isLogin => {
      this.isLogin = isLogin;
    });
  }
}
