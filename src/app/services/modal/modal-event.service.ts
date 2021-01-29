import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {CommandAppDetailModal} from '../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../commands/command-app-list-modal';
import {AppConnectedEvent} from '../../events/app-connected-event';
import {AppDisconnectedEvent} from '../../events/app-disconnected-event';
import {AddToShortcutEvent} from '../../events/add-to-shortcut-event';
import {AddToUrlRedirectionEvent} from '../../events/add-to-url-redirection-event';

@Injectable({
  providedIn: 'root'
})
export class ModalEventService {

  private openAppDetailModal = new Subject<CommandAppDetailModal>();
  private openAppListModal = new Subject<CommandAppListModal>();

  private appConnectionEventPipe = new Subject<AppConnectedEvent>();
  private appDisconnectionEventPipe = new Subject<AppDisconnectedEvent>();

  private addToShortcutEventPipe = new Subject<AddToShortcutEvent>();
  private addToUrlRedirectionEventPipe = new Subject<AddToUrlRedirectionEvent>();
  constructor() { }

  public getOpenAppDetailModal(): Observable<CommandAppDetailModal> {
    return this.openAppDetailModal.asObservable();
  }

  public publishOpenAppDetailModal(command: CommandAppDetailModal): void {
    this.openAppDetailModal.next(command);
  }

  public getOpenAppListModal(): Observable<CommandAppListModal> {
    return this.openAppListModal.asObservable();
  }

  public publishOpenAppListModal(command: CommandAppListModal): void {
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

  public getAddToShortcutEventPipe(): Observable<AddToShortcutEvent> {
    return this.addToShortcutEventPipe.asObservable();
  }

  public publishAddToShortcutEvent(event: AddToShortcutEvent): void {
    this.addToShortcutEventPipe.next(event);
  }

  public getAddToUrlRedirectionEventPipe(): Observable<AddToUrlRedirectionEvent> {
    return this.addToUrlRedirectionEventPipe.asObservable();
  }

  public publishAddToUrlRedirectionEvent(event: AddToUrlRedirectionEvent): void {
    this.addToUrlRedirectionEventPipe.next(event);
  }
}
