import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConnectedApp} from '../../../models/connected-app';
import {Shortcut} from '../../../models/shortcut';
import {UrlRedirection} from '../../../models/url-redirection';
import {ModalEventService} from '../../../services/modal/modal-event.service';
import {CommandAppDetailModal} from '../../../commands/command-app-detail-modal';
import {CommandAppListModal} from '../../../commands/command-app-list-modal';
import {Subscription} from 'rxjs';
import {ShortcutForm} from '../../../models/shortcut-form';
import {ShortcutService} from '../../../services/shortcut/shortcut.service';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit, OnDestroy {
  private pathRegExp = new RegExp('[a-z]{2,}(/[a-z]+)?(/[a-z]+)?');
  constructor(private modalEventService: ModalEventService, private shortcutService: ShortcutService) {
  }

  @Input()
  public connectedApps: ConnectedApp[] = [];
  @Input()
  public shortcuts: Shortcut[] = [];
  @Input()
  public urlRedirections: UrlRedirection[] = [];

  public hideAddNewBtn = false;
  public disableConnectedAppClick = false;

  public shortcutForms: ShortcutForm[] = [];

  public appConnectionSubscription: Subscription;
  public appDisconnectionSubscription: Subscription;

  public addToShortcutSubscription: Subscription;

  private static generateShortcutFormId(): string {
    let uuidValue = '';
    let k;
    let randomValue;
    for (k = 0; k < 32; k++) {
      // tslint:disable-next-line:no-bitwise
      randomValue = Math.random() * 16 | 0;

      if (k === 8 || k === 12 || k === 16 || k === 20) {
        uuidValue += '-';
      }
      // tslint:disable-next-line:no-bitwise
      uuidValue += (k === 12 ? 4 : (k === 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);
    }
    return uuidValue;
  }

  public ngOnInit(): void {
    console.log('ShortcutComponent init!');

    console.log(this.connectedApps);
    console.log(this.shortcuts);
    console.log(this.urlRedirections);

    this.appConnectionSubscription = this.modalEventService.getAppConnectionEventPipe().subscribe(evt => {
      this.connectedApps.push(new ConnectedApp(evt.connectedId, evt.appCode, evt.appName, evt.appIcon, evt.domain, evt.description));
    });

    this.appDisconnectionSubscription = this.modalEventService.getAppDisconnectionEventPipe().subscribe(evt => {
      // tslint:disable-next-line:prefer-for-of
      let removeTargetIdx = 0;
      for (let idx = 0; idx < this.connectedApps.length; idx++) {
        if (evt.appCode === this.connectedApps[idx].appCode) {
          removeTargetIdx = idx;
          break;
        }
      }
      this.connectedApps.splice(removeTargetIdx, 1);
    });

    this.addToShortcutSubscription = this.modalEventService.getAddToShortcutEventPipe().subscribe(evt => {
      console.log(evt);
      this.shortcutForms.push(new ShortcutForm(ShortcutComponent.generateShortcutFormId(),
        evt.providedActionId, evt.type, evt.url, evt.description,
        evt.appIcon, false, false, false, '', evt.connectedId));
    });
  }

  public ngOnDestroy(): void {
    this.appConnectionSubscription.unsubscribe();
    this.appDisconnectionSubscription.unsubscribe();
    this.addToShortcutSubscription.unsubscribe();
  }

  public showAppListModal(): void {
    this.modalEventService.updateOpenAppListModal(new CommandAppListModal('ALL', true));
  }

  public cAppClicked(appCode: number, connectedId: number): void {
    if (this.disableConnectedAppClick) {
      return;
    }
    console.log(appCode);
    this.modalEventService.updateOpenAppDetailModal(new CommandAppDetailModal(appCode, false, connectedId, true));
  }

  public shortcutFormKeywordCheck(event: any, sf: ShortcutForm): void {
    const input = event.target.textContent;
    sf.shortcutKeyword = input;
    console.log(input);
    if (this.pathRegExp.test(input)) {
      console.log('패턴 통과');
      sf.enableSaveBtn = true;
      return;
    }

    sf.enableSaveBtn = false;
    console.log('패턴 불통과!');
  }

  public createShortcut(sf: ShortcutForm): void {
    console.log('save shortcut btn clicked!');
    if (sf.enableSaveBtn) {
      this.shortcutService.createShortcut(sf.connectedId, sf.providedActionId, sf.shortcutKeyword).subscribe(
        s => {
          console.log(s);
          console.log(this.shortcuts);
          this.shortcuts = [s, ...this.shortcuts];
          console.log(this.shortcuts);
          let removeTargetIdx;
          // tslint:disable-next-line:prefer-for-of
          for (let idx = 0; idx < this.shortcutForms.length; idx++) {
            if (sf.id === this.shortcutForms[idx].id) {
              removeTargetIdx = idx;
              break;
            }
          }

          this.shortcutForms.splice(removeTargetIdx, 1);
          this.makeTouchableAppList();
        },
        err => {
          console.log(err);
          alert(err.error.message);
        });
      return;
    }

    console.log('비활성화 되어있음.');
  }

  public makeFormEditable(sf: ShortcutForm): void {
    sf.editable = true;
    sf.contentEditable = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  public deleteForm(sf: ShortcutForm): void {
    let removeTargetIdx = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let idx = 0; idx < this.shortcutForms.length; idx++) {
      if (sf.providedActionId === this.shortcutForms[idx].providedActionId) {
        removeTargetIdx = idx;
        break;
      }
    }
    this.shortcutForms.splice(removeTargetIdx, 1);
    const editingFormCount = this.shortcutForms.filter(f => f.editable && f.contentEditable).length;
    if (editingFormCount === 0) {
      this.hideAddNewBtn = false;
      this.disableConnectedAppClick = false;
    }
  }

  public makeShortcutEditable(s: Shortcut): void {
    s.editable = true;
    s.contentEditable = true;
    s.enableSaveBtn = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  public deleteShortcut(s: Shortcut): void {
    console.log('delete shortcut');
    console.log(s);
    this.shortcutService.deleteShortcut(s.shortcutId).subscribe(
      resp => {
        console.log(resp);
        let removeTargetIdx = 0;
        for (let idx = 0; idx < this.shortcuts.length; idx++) {
          if (s.shortcutId === this.shortcuts[idx].shortcutId) {
            removeTargetIdx = idx;
            break;
          }
        }

        this.shortcuts.splice(removeTargetIdx, 1);
        this.makeTouchableAppList();
      },
      err => {
        console.log(err);
        alert(err.error.message);
      }
    );
  }

  public updateShortcut(s: Shortcut): void {
    console.log('update shortcut');
    console.log(s);
    if (s.enableSaveBtn) {
      this.shortcutService.updateShortcut(s.shortcutId, s.newPath).subscribe(
        resp => {
          console.log(resp);
          s.contentEditable = false;
          s.editable = false;
          this.makeTouchableAppList();
        },
        err => {
          console.log(err);
          alert(err.error.message);
        }
      );
    }

    console.log('update button disabled.');
  }

  public shortcutKeywordCheck(event: any, s: Shortcut): void {
    const input = event.target.textContent;
    s.newPath = input;
    console.log(input);
    if (this.pathRegExp.test(input)) {
      console.log('패턴 통과');
      s.enableSaveBtn = true;
      return;
    }

    s.enableSaveBtn = false;
    console.log('패턴 불통과!');
  }

  private makeTouchableAppList(): void{
    const editingForms = this.shortcutForms.filter(f => f.editable).length;
    const editingShortcuts = this.shortcuts.filter(shortcut => shortcut.editable).length;
    // TODO : url redirection editing length;
    if (editingForms === 0 && editingShortcuts === 0) {
      this.hideAddNewBtn = false;
      this.disableConnectedAppClick = false;
    }
  }
}
