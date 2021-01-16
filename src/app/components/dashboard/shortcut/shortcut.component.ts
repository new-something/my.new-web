import {Component, Input, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';
import {ModalVisibleService} from '../../../services/modal/modal-visible.service';
import {OpenAppDetailModal} from '../../../commands/open-app-detail-modal';
import {OpenAppListModal} from '../../../commands/open-app-list-modal';

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

  constructor(private modalVisibleService: ModalVisibleService) { }

  ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);
  }

  showAppListModal(): void{
    this.modalVisibleService.updateOpenAppListModal(new OpenAppListModal('ALL'));
  }

  cAppClicked(appCode: number): void {
    console.log(appCode);
    this.modalVisibleService.updateOpenAppDetailModal(new OpenAppDetailModal(appCode, false));
  }
}
