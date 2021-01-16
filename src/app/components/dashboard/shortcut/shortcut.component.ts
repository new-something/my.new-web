import {Component, Input, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';

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

  constructor() { }

  ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);
  }

  showAppListModal(): void{
    document.querySelector('#app-list-modal').classList.add('is-active');
  }

  openDetailModal(appCode: number): void {
    console.log(appCode);
    document.querySelector('#app-detail-modal').classList.add('is-active');
  }
}
