import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-redirect-loading',
  templateUrl: './redirect-loading.component.html',
  styleUrls: ['./redirect-loading.component.css']
})
export class RedirectLoadingComponent implements OnInit {
  private landing = environment.router;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    let authenticated = false;
    this.authService.isAuthenticated().subscribe(auth => {
      authenticated = auth;
    });

    if (authenticated) {
      this.router.navigate(['u/dashboard']).catch(e => console.log(e));
      return;
    }

    window.location.href = this.landing;
  }
}
