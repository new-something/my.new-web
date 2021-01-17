import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ModalEventService} from '../../../../../services/modal/modal-event.service';
import {Subscription} from 'rxjs';
import {CommandAppDetailModal} from '../../../../../commands/command-app-detail-modal';
import {ProvidedAppService} from '../../../../../services/app/provided-app.service';
import {ProvidedAppDetail} from '../../../../../models/provided-app-detail';
import {CommandAppListModal} from '../../../../../commands/command-app-list-modal';
import {ConnectedAppService} from '../../../../../services/app/connected-app.service';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit, OnDestroy {
  public connected = false;
  public showDetailModal = false;
  public hasBackModalStep = false;
  public openCommand: CommandAppDetailModal;
  public subscription: Subscription;

  public providedAppDetail: ProvidedAppDetail;

  constructor(private modalEventService: ModalEventService, private providedAppService: ProvidedAppService,
              private connectedAppService: ConnectedAppService) {
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  public ngOnInit(): void {
    // set subscribe to message service
    this.subscription = this.modalEventService.getOpenAppDetailModal().subscribe(openCommand => {
      console.log('app detail modal open command app code : ' + openCommand.appCode);
      this.connected = openCommand.connected;
      this.showDetailModal = true;
      this.hasBackModalStep = openCommand.hasBackModalStep;
      this.openCommand = openCommand;
      this.providedAppService.findById(openCommand.appCode).subscribe(data => {
        this.providedAppDetail = data;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(this.providedAppDetail);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
      });
    });
  }

  public hideAppDetailModal(): void {
    this.showDetailModal = false;
    if (this.hasBackModalStep) {
      this.modalEventService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
    }
  }

  public hideAllModal(): void {
    this.showDetailModal = false;
    this.modalEventService.updateOpenAppListModal(new CommandAppListModal('ALL', false));
  }

  // TODO : update connected app list update
  // TODO : update app list modal update
  // TODO : update app detail modal update
  public connectApp(appCode: number): void {
    this.connectedAppService.connect(appCode).subscribe(resp => {
      console.log(resp);
      this.connected = false;
    });
  }

  // TODO : update connected app list update
  // TODO : update app list modal update
  // TODO : update app detail modal update
  public disconnectApp(appCode: number): void {
    this.connectedAppService.disconnect(appCode).subscribe(resp => {
      console.log(resp);
      this.connected = true;
    });
  }
}
