import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CommandAppDetailModal} from '../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../commands/command-app-list-modal';
import {AppConnectedEvent} from '../../commands/app-connected-event';
import {AppDisconnectedEvent} from '../../commands/app-disconnected-event';

@Injectable({
  providedIn: 'root'
})
export class ModalEventService {

  private openAppDetailModal = new Subject<CommandAppDetailModal>();
  private openAppListModal = new Subject<CommandAppListModal>();

  private appConnectionEventPipe = new Subject<AppConnectedEvent>();
  private appDisconnectionEventPipe = new Subject<AppDisconnectedEvent>();

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

  public getAppConnectionEventPipe(): Observable<AppConnectedEvent> {
    return this.appConnectionEventPipe.asObservable();
  }

  public publishAppConnectionEvent(event: AppConnectedEvent): void {
    this.appConnectionEventPipe.next(event);
  }

  public getAppDisconnectionEventPipe(): Observable<AppDisconnectedEvent> {
    return this.appDisconnectionEventPipe.asObservable();
  }

  public publishAppDisconnectionEvent(event: AppDisconnectedEvent): void {
    this.appDisconnectionEventPipe.next(event);
  }
}
