import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  private appService: string = environment.appService;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  hideAppListModal(): void {
    document.querySelector('#app-list-modal').classList.remove('is-active');
  }

  changeAppTag($event): void {
    console.log($event);
    console.log($event.target);
    console.log($event.target.value);
    const url = this.appService + '/a/apps?tag=' + $event.target.value;
    console.log(url);
    this.httpClient.get<ProvidedAppResponse>(url).subscribe(data => {
      console.log(data);
    });
  }
}

interface ProvidedAppResponse {
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  connected: boolean;
  connectedId: number;
}
