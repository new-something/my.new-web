import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {OpenAddDetailModal} from '../../commands/open-add-detail-modal';

@Injectable({
  providedIn: 'root'
})
export class ModalVisibleService {

  private siblingMsg = new Subject<OpenAddDetailModal>();

  constructor() { }

  /*
   * @return {Observable<string>} : siblingMsg
   */
  public getMessage(): Observable<OpenAddDetailModal> {
    return this.siblingMsg.asObservable();
  }
  /*
   * @param {string} message : siblingMsg
   */
  public updateMessage(message: OpenAddDetailModal): void {
    this.siblingMsg.next(message);
  }
}
