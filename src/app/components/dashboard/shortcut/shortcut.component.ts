import {Component, Input, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';
import {ModalEventService} from '../../../services/modal/modal-event.service';
import {CommandAppDetailModal} from '../../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../../commands/command-app-list-modal';

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

  constructor(private modalVisibleService: ModalEventService) { }

  ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);
  }

  showAppListModal(): void{
    this.modalVisibleService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
  }

  cAppClicked(appCode: number): void {
    console.log(appCode);
    this.modalVisibleService.updateOpenAppDetailModal(new CommandAppDetailModal(appCode, false, true));
  }
}
