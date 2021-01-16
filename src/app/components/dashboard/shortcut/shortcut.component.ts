import {Component, Input, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';
import {ConnectedAppService} from '../../../services/app/connected-app.service';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {

  @Input()
  connectedApps: ConnectedApp[] = [];
  @Input()
  shortcuts: Shortcut[] = [];
  @Input()
  urlRedirections: UrlRedirection[] = [];

  constructor(private connectedAppService: ConnectedAppService) { }

  ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);
  }

  showAppListModal(): void{
    document.querySelector('#app-list-modal').classList.add('is-active');
  }

  cAppClicked(appCode: number): void {
    console.log(appCode);
    document.querySelector('#app-detail-modal').classList.add('is-active');
    this.connectedAppService.findByAppCode(appCode).subscribe(data => console.log(data));
  }
}
