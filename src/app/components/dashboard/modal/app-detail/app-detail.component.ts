import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit(): void {
    console.log('app detail modal component on init!');
  }

  ngOnDestroy(): void {
    console.log('app detail modal component on destroy!');
  }

}
