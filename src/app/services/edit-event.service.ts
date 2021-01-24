import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {EditEvent} from '../events/edit-event';

@Injectable({
  providedIn: 'root'
})
export class EditEventService {

  private editEventPipe = new Subject<EditEvent>();

  constructor() { }

  public getEditEventPipe(): Observable<EditEvent> {
    return this.editEventPipe.asObservable();
  }

  public publishEditEvent(evt: EditEvent): void {
    this.editEventPipe.next(evt);
  }
}
