import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CommandAppDetailModal} from '../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../commands/command-app-list-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalVisibleService {

  private openAppDetailModal = new Subject<CommandAppDetailModal>();
  private openAppListModal = new Subject<CommandAppListModal>();

  constructor() { }

  public getOpenAppDetailModal(): Observable<CommandAppDetailModal> {
    return this.openAppDetailModal.asObservable();
  }

  public updateOpenAppDetailModal(command: CommandAppDetailModal): void {
    this.openAppDetailModal.next(command);
  }

  public getOpenAppListModal(): Observable<CommandAppListModal> {
    return this.openAppListModal.asObservable();
  }

  public updateOpenAppListModal(command: CommandAppListModal): void {
    this.openAppListModal.next(command);
  }
}
