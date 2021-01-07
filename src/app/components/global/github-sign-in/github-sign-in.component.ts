import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-github-sign-in',
  templateUrl: './github-sign-in.component.html',
  styleUrls: ['./github-sign-in.component.css']
})
export class GithubSignInComponent implements OnInit {
  private userService: string = environment.userService;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
              private jwtHelperService: JwtHelperService, private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    let code = '';
    let error = '';
    this.route.queryParams.subscribe(params => {
      code = '' + params.code;
      error = params.error;
    });

    if (error !== '') {
      this.router.navigate(['']).catch(e => console.log(e));
      return;
    }

    this.httpClient.get<GithubAccessToken>(this.userService + '/github/access-token?code=' + code).toPromise()
      .then(resp => {
        this.getJwt(resp.access_token);
      })
      .catch(err => console.log(err));
  }

  getJwt(accessToken: string): void {
    this.httpClient.get<LoginCompleteResponse>(this.userService + '/github/login/complete?accessToken=' + accessToken).toPromise()
      .then(resp => {
        console.log(resp.jwt);
        this.cookieService.set('my-new-a', 'testvalue', {domain: 'localhost:4300'});
        localStorage.setItem('my-new-a', resp.jwt);
        this.router.navigate(['u/dashboard']).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

}

interface GithubAccessToken {
  access_token: string;
  scope: string;
  token_type: string;
}

interface LoginCompleteResponse {
  jwt: string;
}
