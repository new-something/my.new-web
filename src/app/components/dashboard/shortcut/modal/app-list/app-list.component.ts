import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProvidedApp} from '../../../../../models/provided-app';
import {ProvidedAppService} from '../../../../../services/app/provided-app.service';
import {ModalEventService} from '../../../../../services/modal/modal-event.service';
import {CommandAppDetailModal} from '../../../../../commands/command-app-detail-modal';
import {Subscription} from 'rxjs';
import {AddToUrlRedirectionEvent} from '../../../../../events/add-to-url-redirection-event';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit, OnDestroy {
  public showLoading = true;
  public showListModal = false;
  public providedApps: ProvidedApp[] = [];
  public subscription: Subscription;

  constructor(private providedAppService: ProvidedAppService, private modalEventService: ModalEventService) {
  }

  public ngOnInit(): void {
    this.subscription = this.modalEventService.getOpenAppListModal().subscribe(openCommand => {
      this.showLoading = true;
      this.showListModal = openCommand.visible;
      if (this.showListModal) {
        this.providedAppService.findAllByTag(openCommand.tag).subscribe(providedApps => {
          this.showLoading = false;
          this.providedApps = providedApps;
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  public hideAppListModal(): void {
    this.showListModal = false;
  }

  public changeAppTag($event): void {
    if (this.showLoading) {
      console.log('processing to load app list by tag, wait to complete previous work.');
      return;
    }

    this.showLoading = true;
    const tag = $event.target.value;
    this.providedAppService.findAllByTag(tag).subscribe(providedApps => {
      this.providedApps = providedApps;
      this.showLoading = false;
    });
  }

  public showAppDetailModal(appCode: number): void {
    this.showListModal = false;
    const providedApp = this.providedApps.filter((pa) => pa.appCode === appCode).pop();
    this.modalEventService.updateOpenAppDetailModal(
      new CommandAppDetailModal(appCode, true, providedApp.connectedId, providedApp.connected)
    );
  }

  public addToUrlRedirection(): void {
    this.showListModal = false;
    this.modalEventService.publishAddToUrlRedirectionEvent(new AddToUrlRedirectionEvent());
  }
}
