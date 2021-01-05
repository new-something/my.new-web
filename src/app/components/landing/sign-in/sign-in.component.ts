import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showLogin(): void{
    document.getElementById('signinPopup').classList.toggle('is-active');
  }

  signInByGithub(): void{
    window.open('https://github.com/login/oauth/authorize?scope=read:user&client_id=6d91f0584d549619c938', '_parent');
  }
}
