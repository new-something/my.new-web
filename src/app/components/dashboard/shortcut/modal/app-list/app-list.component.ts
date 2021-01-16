import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProvidedApp} from '../../../../../models/provided-app';
import {ProvidedAppService} from '../../../../../services/app/provided-app.service';
import {ModalVisibleService} from '../../../../../services/modal/modal-visible.service';
import {CommandAppDetailModal} from '../../../../../commands/command-app-detail-modal';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit, OnDestroy {
  public showListModal = false;
  public providedApps: ProvidedApp[] = [];
  public subscription: Subscription;

  constructor(private providedAppService: ProvidedAppService, private modalVisibleService: ModalVisibleService) { }

  ngOnInit(): void {
    this.subscription = this.modalVisibleService.getOpenAppListModal().subscribe(openCommand => {
      this.showListModal = openCommand.visible;
      this.providedAppService.findAllByTag(openCommand.tag).subscribe(providedApps => this.providedApps = providedApps);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // onDestroy cancels the subscribe request
  }

  hideAppListModal(): void {
    this.showListModal = false;
  }

  changeAppTag($event): void {
    console.log($event);
    console.log($event.target);
    console.log($event.target.value);
    const tag = $event.target.value;
    this.providedAppService.findAllByTag(tag).subscribe(providedApps => this.providedApps = providedApps);
  }

  showAppDetailModal(appCode: number): void {
    this.showListModal = false;
    this.modalVisibleService.updateOpenAppDetailModal(new CommandAppDetailModal(appCode, true));
  }
}
