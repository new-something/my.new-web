import {Component, OnInit} from '@angular/core';
import {ProvidedApp} from '../../../../models/provided-app';
import {ProvidedAppService} from '../../../../services/app/provided-app.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  providedApps: ProvidedApp[] = [];

  constructor(private providedAppService: ProvidedAppService) { }

  ngOnInit(): void {
    this.providedAppService.findAllByTag('ALL').subscribe(providedApps => this.providedApps = providedApps);
  }

  hideAppListModal(): void {
    document.querySelector('#app-list-modal').classList.remove('is-active');
  }

  changeAppTag($event): void {
    console.log($event);
    console.log($event.target);
    console.log($event.target.value);
    const tag = $event.target.value;
    this.providedAppService.findAllByTag(tag).subscribe(providedApps => this.providedApps = providedApps);
  }
}
