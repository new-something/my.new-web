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
  private userService: string = environment.userService;
  private routerUrl: string = environment.router;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute,
              private jwtHelperService: JwtHelperService, private router: Router) {
  }

  ngOnInit(): void {
    let code = '';
    let error = '';
    this.route.queryParams.subscribe(params => {
      code = '' + params.code;
      error = params.error;
    });

    this.httpClient.get<LoginCompleteResponse>(this.userService + '/github/login/complete?code=' + code).toPromise()
      .then(resp => {
        console.log(resp.jwt);
        localStorage.setItem('my-new-a', resp.jwt);
        document.cookie = 'my-new-a=' + resp.jwt + ';domain=amazonaws.com';
        console.log('cookie 가 set 되어야 된다구...');
        this.router.navigate(['u/dashboard']).catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}

interface LoginCompleteResponse {
  jwt: string;
}
