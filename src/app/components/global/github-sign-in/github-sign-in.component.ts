import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-github-sign-in',
  templateUrl: './github-sign-in.component.html',
  styleUrls: ['./github-sign-in.component.css']
})
export class GithubSignInComponent implements OnInit {
  private code: string;
  private accessToken: string;
  private userService: string = environment.userService;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
              private jwtHelperService: JwtHelperService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = '' + params.code;
    });
    this.httpClient.get<GithubAccessToken>(this.userService + '/github/access-token?code=' + this.code).toPromise()
      .then(resp => {
        this.accessToken = resp.access_token;
        this.getJwt(this.accessToken);
      })
      .catch(err => console.log(err));
  }

  getJwt(accessToken: string): void {
    this.httpClient.get<LoginCompleteResponse>(this.userService + '/github/login/complete?accessToken=' + this.accessToken).toPromise()
      .then(resp => {
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
