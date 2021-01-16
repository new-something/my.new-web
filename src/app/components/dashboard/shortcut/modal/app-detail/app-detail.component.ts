import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalVisibleService} from '../../../../../services/modal/modal-visible.service';
import {Subscription} from 'rxjs';
import {OpenAddDetailModal} from '../../../../../commands/open-add-detail-modal';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit, OnDestroy {
  public openCommand: OpenAddDetailModal;
  public subscription: Subscription;
  constructor(private modalVisibleService: ModalVisibleService) { }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  public ngOnInit(): void {
    // set subscribe to message service
    this.subscription = this.modalVisibleService.getMessage().subscribe(openCommand => {
      console.log('app detail modal open command app code : ' + openCommand.appCode);
      this.openCommand = openCommand;
    });
  }

}
