import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalVisibleService} from '../../../../../services/modal/modal-visible.service';
import {Subscription} from 'rxjs';
import {CommandAppDetailModal} from '../../../../../commands/command-app-detail-modal';
import {ProvidedAppService} from '../../../../../services/app/provided-app.service';
import {ProvidedAppDetail} from '../../../../../models/provided-app-detail';
import {CommandAppListModal} from '../../../../../commands/command-app-list-modal';

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
  constructor(private modalVisibleService: ModalVisibleService, private providedAppService: ProvidedAppService) { }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  public ngOnInit(): void {
    // set subscribe to message service
    this.subscription = this.modalVisibleService.getOpenAppDetailModal().subscribe(openCommand => {
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
      this.modalVisibleService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
    }
  }

  public hideAllModal(): void {
    this.showDetailModal = false;
    this.modalVisibleService.updateOpenAppListModal(new CommandAppListModal('ALL', false));
  }
}
