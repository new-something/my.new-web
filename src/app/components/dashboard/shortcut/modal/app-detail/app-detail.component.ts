import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalEventService} from '../../../../../services/modal/modal-event.service';
import {Subscription} from 'rxjs';
import {ProvidedAppService} from '../../../../../services/app/provided-app.service';
import {ProvidedAppDetail} from '../../../../../models/provided-app-detail';
import {CommandAppListModal} from '../../../../../commands/command-app-list-modal';
import {ConnectedAppService} from '../../../../../services/app/connected-app.service';
import {AppConnectedEvent} from '../../../../../events/app-connected-event';
import {AppDisconnectedEvent} from '../../../../../events/app-disconnected-event';
import {AddToShortcutEvent} from '../../../../../events/add-to-shortcut-event';
import {ProvidedAction} from '../../../../../models/provided-action';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit, OnDestroy {
  public showLoading = true;
  public connectedId = null;
  public connected = false;
  public showDetailModal = false;
  public subscription: Subscription;

  public providedAppDetail: ProvidedAppDetail;

  public connectBtnClicked = false;
  public disconnectBtnClicked = false;

  private static showBodyScrollbar(): void {
    const body = document.querySelector('body');
    body.classList.remove('no-overflow');
  }

  constructor(private modalEventService: ModalEventService, private providedAppService: ProvidedAppService,
              private connectedAppService: ConnectedAppService) {
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  public ngOnInit(): void {
    // set subscribe to message service
    this.subscription = this.modalEventService.getOpenAppDetailModal().subscribe(openCommand => {
      this.showLoading = true;
      this.connectedId = openCommand.connectedId;
      this.connected = openCommand.connected;
      this.showDetailModal = true;
      this.providedAppService.findById(openCommand.appCode).subscribe(data => {
        this.providedAppDetail = data;
        this.showLoading = false;
      });
    });
  }

  public hideAppDetailModal(): void {
    this.showDetailModal = false;
    this.modalEventService.publishOpenAppListModal(new CommandAppListModal('ALL', true));
  }

  public hideAllModal(): void {
    this.showDetailModal = false;
    this.modalEventService.publishOpenAppListModal(new CommandAppListModal('ALL', false));
    AppDetailComponent.showBodyScrollbar();
  }

  public connectApp(appCode: number): void {
    if (this.connectBtnClicked) {
      console.log('processing to connect app');
      return;
    }

    this.connectBtnClicked = true;
    this.connectedAppService.connect(appCode).subscribe(
      resp => {
        this.modalEventService.publishAppConnectionEvent(new AppConnectedEvent(
          resp.appCode,
          resp.connectedId,
          resp.appName,
          resp.appIcon,
          resp.domain,
          resp.description)
        );
        this.connected = true;
        this.connectedId = resp.connectedId;
        this.connectBtnClicked = false;
      },
      error => {
        console.log(error);
        this.connectBtnClicked = false;
      }
    );
  }

  public disconnectApp(appCode: number): void {
    if (this.disconnectBtnClicked) {
      console.log('processing to disconnect app');
      return;
    }

    if (confirm('If you disconnect this app, all the shortcuts belong to will be deleted. Are you sure to continue to disconnect?')) {
      this.disconnectBtnClicked = true;
      this.connectedAppService.disconnect(appCode).subscribe(
        () => {
          this.modalEventService.publishAppDisconnectionEvent(new AppDisconnectedEvent(appCode));
          this.connected = false;
          this.connectedId = null;
          this.disconnectBtnClicked = false;
        },
        error => {
          console.log(error);
          this.disconnectBtnClicked = false;
        });
    }
  }

  public addToShortcut(providedAction: ProvidedAction, appIcon: string): void {
    if (!this.connected) {
      return;
    }

    this.hideAllModal();
    this.modalEventService.publishAddToShortcutEvent(new AddToShortcutEvent(
      providedAction.providedActionId,
      providedAction.type,
      providedAction.url,
      providedAction.description,
      appIcon,
      this.connectedId
    ));
  }
}
