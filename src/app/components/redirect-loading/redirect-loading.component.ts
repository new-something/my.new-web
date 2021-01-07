import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-redirect-loading',
  templateUrl: './redirect-loading.component.html',
  styleUrls: ['./redirect-loading.component.css']
})
export class RedirectLoadingComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['u/dashboard']).catch(e => console.log(e));
    } else {
      window.location.href = 'https://github.com/login/oauth/authorize?scope=read:user&client_id=6d91f0584d549619c938';
    }
  }
}
