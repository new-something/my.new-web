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
    window.open('https://github.com/login/oauth/authorize?scope=read:user&client_id=2a433252e03305352ce2',
      '_parent', 'width=300,height=400');
  }
}
