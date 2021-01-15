import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hideAppListModal(): void {
    document.querySelector('#app-list-modal').classList.remove('is-active');
  }
}
