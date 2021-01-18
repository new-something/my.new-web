import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';
import {ModalEventService} from '../../../services/modal/modal-event.service';
import {CommandAppDetailModal} from '../../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../../commands/command-app-list-modal';
import {Subscription} from 'rxjs';
import {ShortcutForm} from '../../../models/shortcut-form';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit, OnDestroy {
  @Input()
  public connectedApps: ConnectedApp[] = [];
  @Input()
  public shortcuts: Shortcut[] = [];
  @Input()
  public urlRedirections: UrlRedirection[] = [];

  public hideAddNewBtn = false;
  public disableConnectedAppClick = false;

  public shortcutForms: ShortcutForm[] = [];

  public appConnectionSubscription: Subscription;
  public appDisconnectionSubscription: Subscription;

  public addToShortcutSubscription: Subscription;

  constructor(private modalEventService: ModalEventService) {
  }

  public ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);

    this.appConnectionSubscription = this.modalEventService.getAppConnectionEventPipe().subscribe(evt => {
      this.connectedApps.push(new ConnectedApp(evt.connectedId, evt.appCode, evt.appName, evt.appIcon, evt.domain, evt.description));
    });

    this.appDisconnectionSubscription = this.modalEventService.getAppDisconnectionEventPipe().subscribe(evt => {
      // tslint:disable-next-line:prefer-for-of
      let removeTargetIdx = 0;
      for (let idx = 0; idx < this.connectedApps.length; idx++) {
        if (evt.appCode === this.connectedApps[idx].appCode) {
          removeTargetIdx = idx;
          break;
        }
      }
      this.connectedApps.splice(removeTargetIdx, 1);
    });

    this.addToShortcutSubscription = this.modalEventService.getAddToShortcutEventPipe().subscribe(evt => {
      console.log(evt);
      this.shortcutForms.push(new ShortcutForm(evt.providedActionId, evt.type, evt.url, evt.description, evt.appIcon, false, false));
    });
  }

  public ngOnDestroy(): void {
    this.appConnectionSubscription.unsubscribe();
    this.appDisconnectionSubscription.unsubscribe();
    this.addToShortcutSubscription.unsubscribe();
  }

  public showAppListModal(): void {
    this.modalEventService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
  }

  public cAppClicked(appCode: number): void {
    if (this.disableConnectedAppClick) {
      return;
    }
    console.log(appCode);
    this.modalEventService.updateOpenAppDetailModal(new CommandAppDetailModal(appCode, false, true));
  }

  public makeEditable(sf: ShortcutForm): void {
    sf.editable = true;
    sf.contentEditable = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }
}
