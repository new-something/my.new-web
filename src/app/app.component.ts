import {Component, isDevMode, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    if (isDevMode()){
      console.log('Dev Mode');
    } else {
      console.log('Prod Mode');
    }
  }
}
