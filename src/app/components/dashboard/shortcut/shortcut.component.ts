import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';
import {ModalEventService} from '../../../services/modal/modal-event.service';
import {CommandAppDetailModal} from '../../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../../commands/command-app-list-modal';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit, OnDestroy {
  @Input()
  connectedApps: ConnectedApp[] = [];
  @Input()
  shortcuts: Shortcut[] = [];
  @Input()
  urlRedirections: UrlRedirection[] = [];

  public appConnectionSubscription: Subscription;
  public appDisconnectionSubscription: Subscription;

  constructor(private modalEventService: ModalEventService) {
  }

  ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);

    this.appConnectionSubscription = this.modalEventService.getAppConnectionEventPipe().subscribe(evt => {
      this.connectedApps.push(new ConnectedApp(evt.connectedId, evt.appCode, evt.appName, evt.appIcon, evt.domain, evt.description));
    });
    this.appDisconnectionSubscription = this.modalEventService.getAppDisconnectionEventPipe().subscribe(evt => {
      console.log(evt.appCode);
      this.connectedApps.filter(c => c.appCode === evt.appCode).pop();
    });
  }

  ngOnDestroy(): void {
    this.appConnectionSubscription.unsubscribe();
    this.appDisconnectionSubscription.unsubscribe();
  }

  showAppListModal(): void {
    this.modalEventService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
  }

  cAppClicked(appCode: number): void {
    console.log(appCode);
    this.modalEventService.updateOpenAppDetailModal(new CommandAppDetailModal(appCode, false, true));
  }
}
