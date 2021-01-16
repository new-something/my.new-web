import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {OpenAppDetailModal} from '../../commands/open-app-detail-modal';
import {OpenAppListModal} from '../../commands/open-app-list-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalVisibleService {

  private openAppDetailModal = new Subject<OpenAppDetailModal>();
  private openAppListModal = new Subject<OpenAppListModal>();

  constructor() { }

  public getOpenAppDetailModal(): Observable<OpenAppDetailModal> {
    return this.openAppDetailModal.asObservable();
  }

  public updateOpenAppDetailModal(command: OpenAppDetailModal): void {
    this.openAppDetailModal.next(command);
  }

  public getOpenAppListModal(): Observable<OpenAppListModal> {
    return this.openAppListModal.asObservable();
  }

  public updateOpenAppListModal(command: OpenAppListModal): void {
    this.openAppListModal.next(command);
  }
}
