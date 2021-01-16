import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalVisibleService} from '../../../../../services/modal/modal-visible.service';
import {Subscription} from 'rxjs';
import {OpenAddDetailModal} from '../../../../../commands/open-add-detail-modal';
import {ProvidedAppService} from '../../../../../services/app/provided-app.service';
import {ProvidedAppDetail} from '../../../../../models/provided-app-detail';

@Component({
  selector: 'app-app-detail',
  templateUrl: './app-detail.component.html',
  styleUrls: ['./app-detail.component.css']
})
export class AppDetailComponent implements OnInit, OnDestroy {
  public showDetailModal = false;
  public openCommand: OpenAddDetailModal;
  public subscription: Subscription;

  public providedAppDetail: ProvidedAppDetail;
  constructor(private modalVisibleService: ModalVisibleService, private providedAppService: ProvidedAppService) { }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  public ngOnInit(): void {
    // set subscribe to message service
    this.subscription = this.modalVisibleService.getMessage().subscribe(openCommand => {
      console.log('app detail modal open command app code : ' + openCommand.appCode);
      this.showDetailModal = true;
      this.openCommand = openCommand;
      this.providedAppService.findById(openCommand.appCode).subscribe(data => {
        this.providedAppDetail = data;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(this.providedAppDetail);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
      });
    });
  }

}
