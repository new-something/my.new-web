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
import {UrlRedirectionForm} from '../../../models/url-redirection-form';
import {UrlRedirectionService} from '../../../services/url-redirection/url-redirection.service';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit, OnDestroy {
  private pathRegExp = new RegExp('[a-z]{2,}(/[a-z]+)?(/[a-z]+)?');
  private urlRegExp = new RegExp('^(https?|chrome):\\/\\/[^\\s$.?#].[^\\s]*$');

  constructor(private modalEventService: ModalEventService, private shortcutService: ShortcutService,
              private urlRedirectionService: UrlRedirectionService) {
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
  public urlRedirectionForms: UrlRedirectionForm[] = [];

  public appConnectionSubscription: Subscription;
  public appDisconnectionSubscription: Subscription;

  public addToShortcutSubscription: Subscription;
  public addToUrlRedirectionSubscription: Subscription;

  private static generateFormId(): string {
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
      this.shortcutForms.push(new ShortcutForm(ShortcutComponent.generateFormId(),
        evt.providedActionId, evt.type, evt.url, evt.description,
        evt.appIcon, false, false, false, '', evt.connectedId));
    });

    this.addToUrlRedirectionSubscription = this.modalEventService.getAddToUrlRedirectionEventPipe().subscribe(evt => {
      this.urlRedirectionForms.push(new UrlRedirectionForm(ShortcutComponent.generateFormId()));
    });
  }

  public ngOnDestroy(): void {
    this.appConnectionSubscription.unsubscribe();
    this.appDisconnectionSubscription.unsubscribe();
    this.addToShortcutSubscription.unsubscribe();
    this.addToUrlRedirectionSubscription.unsubscribe();
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

  public shortcutFormPathCheck(event: any, sf: ShortcutForm): void {
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
      if (sf.createBtnClicked) {
        console.log('processing to create shortcut');
        return;
      }

      sf.createBtnClicked = true;
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
          sf.createBtnClicked = false;
        },
        err => {
          console.log(err);
          alert(err.error.message);
          sf.createBtnClicked = false;
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
    if (s.deleteBtnClicked) {
      console.log('processing to delete shortcut');
      return;
    }

    s.deleteBtnClicked = true;
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
        s.deleteBtnClicked = false;
      },
      err => {
        console.log(err);
        alert(err.error.message);
        s.deleteBtnClicked = false;
      }
    );
  }

  public updateShortcut(s: Shortcut): void {
    console.log('update shortcut');
    console.log(s);
    if (!s.pathChange) {
      s.contentEditable = false;
      s.editable = false;
      this.makeTouchableAppList();
      return;
    }

    if (s.enableSaveBtn && s.pathChange) {
      if (s.updateBtnClicked) {
        console.log('processing to update shortcut');
        return;
      }

      s.updateBtnClicked = true;
      this.shortcutService.updateShortcut(s.shortcutId, s.newPath).subscribe(
        resp => {
          console.log(resp);
          s.contentEditable = false;
          s.editable = false;
          s.pathChange = false;
          this.makeTouchableAppList();
          s.updateBtnClicked = false;
        },
        err => {
          console.log(err);
          alert(err.error.message);
          s.updateBtnClicked = false
        }
      );
    }

    console.log('update button disabled.');
  }

  public shortcutPathCheck(event: any, s: Shortcut): void {
    const input = event.target.textContent;
    s.newPath = input;
    s.pathChange = true;
    console.log(input);
    if (this.pathRegExp.test(input)) {
      console.log('패턴 통과');
      s.enableSaveBtn = true;
      return;
    }

    s.enableSaveBtn = false;
    console.log('패턴 불통과!');
  }

  public makeUrlRedirectionEditable(ur: UrlRedirection): void {
    ur.contentEditable = true;
    ur.editable = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  public makeUrlRedirectionFormEditable(uf: UrlRedirectionForm): void {
    uf.contentEditable = true;
    uf.editable = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  public deleteUrlRedirectionForm(uf: UrlRedirectionForm): void {
    let removeTargetIdx = 0;
    for (let idx = 0; idx < this.urlRedirectionForms.length; idx++) {
      if (uf.id === this.urlRedirectionForms[idx].id) {
        removeTargetIdx = idx;
        break;
      }
    }

    this.urlRedirectionForms.splice(removeTargetIdx, 1);
    this.makeTouchableAppList();
  }

  public urlRedirectionFormPathCheck(event: any, uf: UrlRedirectionForm): void {
    const input = event.target.textContent;
    uf.path = input;
    console.log(input);
    if (this.urlRegExp.test(uf.destinationUrl) && this.pathRegExp.test(input)) {
      console.log('url 패턴 통과, path 패턴 통과');
      uf.enableSaveBtn = true;
      return;
    }
    uf.enableSaveBtn = false;
    console.log('패턴 불통과!');
  }

  public urlRedirectionFormDestinationUrlCheck(event: any, uf: UrlRedirectionForm): void {
    const input = event.target.textContent;
    uf.destinationUrl = input;
    console.log(input);
    if (this.urlRegExp.test(input) && this.pathRegExp.test(uf.path)) {
      console.log('url 패턴 통과, path 패턴 통과');
      uf.enableSaveBtn = true;
      return;
    }
    uf.enableSaveBtn = false;
    console.log('불통과!');
  }

  public createUrlRedirection(uf: UrlRedirectionForm): void {
    if (uf.createBtnClicked) {
      console.log('processing to create url redirection');
      return;
    }

    uf.createBtnClicked = true;
    console.log(uf);
    this.urlRedirectionService.create(uf.path, uf.destinationUrl).subscribe(
      resp => {
        console.log(resp);
        this.urlRedirections = [resp, ...this.urlRedirections];
        this.deleteUrlRedirectionForm(uf);
        uf.createBtnClicked = false;
      },
      err => {
        alert(err.error.message);
        console.log(err);
        uf.createBtnClicked = false;
      }
    );
  }

  public urlRedirectionPathCheck(event: any, ur: UrlRedirection): void {
    const input = event.target.textContent;
    console.log(input);
    ur.newPath = input;
    ur.pathChange = true;
    // path 만 변경하고 destination 은 변경하지 않은 경우.
    if (ur.pathChange && !ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.destinationUrl)) {
        console.log('url 패턴 통과, path 패턴 통과');
        ur.enableSaveBtn = true;
        return;
      }
      console.log('불통과~');
      ur.enableSaveBtn = false;
      return;
    }

    // path 는 변경하지 않고 destination 만 변경한 경우.
    if (!ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.path) && this.urlRegExp.test(ur.newDestinationUrl)) {
        console.log('url 패턴 통과, path 패턴 통과');
        ur.enableSaveBtn = true;
        return;
      }

      console.log('불통과~');
      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경한 경우.
    if (ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.newDestinationUrl)) {
        console.log('url 패턴 통과, path 패턴 통과');
        ur.enableSaveBtn = true;
        return;
      }

      console.log('불통과~');
      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경하지 않은 경우는 해당 function 을 사용하지 않는다.
  }

  public urlRedirectionDestinationUrlCheck(event: any, ur: UrlRedirection): void {
    const input = event.target.textContent;
    console.log(input);
    ur.newDestinationUrl = input;
    ur.destinationUrlChange = true;
    // path 만 변경하고 destination 은 변경하지 않은 경우.
    if (ur.pathChange && !ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.destinationUrl)) {
        console.log('url 패턴 통과, path 패턴 통과');
        ur.enableSaveBtn = true;
        return;
      }
      console.log('불통과~');
      ur.enableSaveBtn = false;
      return;
    }

    // path 는 변경하지 않고 destination 만 변경한 경우.
    if (!ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.path) && this.urlRegExp.test(ur.newDestinationUrl)) {
        console.log('url 패턴 통과, path 패턴 통과');
        ur.enableSaveBtn = true;
        return;
      }

      console.log('불통과~');
      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경한 경우.
    if (ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.newDestinationUrl)) {
        console.log('url 패턴 통과, path 패턴 통과');
        ur.enableSaveBtn = true;
        return;
      }

      console.log('불통과~');
      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경하지 않은 경우는 해당 function 을 사용하지 않는다.
  }

  public deleteUrlRedirection(ur: UrlRedirection): void {
    if (ur.deleteBtnClicked) {
      console.log('processing to delete url redirection');
      return;
    }

    ur.deleteBtnClicked = true;
    console.log(ur);
    this.urlRedirectionService.delete(ur.urlRedirectionId).subscribe(
      resp => {
        let removeTargetIdx = 0;
        for (let idx = 0; idx < this.urlRedirections.length; idx++) {
          if (ur.urlRedirectionId === this.urlRedirections[idx].urlRedirectionId) {
            removeTargetIdx = idx;
            break;
          }
        }
        this.urlRedirections.splice(removeTargetIdx, 1);
        this.makeTouchableAppList();
        ur.deleteBtnClicked = false;
      },
      err => {
        console.log(err);
        alert(err.error.message);
        ur.deleteBtnClicked = false;
      }
    );
  }

  public updateUrlRedirection(ur: UrlRedirection): void {
    if (!ur.pathChange && !ur.destinationUrlChange) {
      ur.contentEditable = false;
      ur.editable = false;
      this.makeTouchableAppList();
      return;
    }

    if (ur.updateBtnClicked) {
      console.log('processing to update url redirection');
      return;
    }

    ur.updateBtnClicked = true;

    let path = ur.path;
    let destinationUrl = ur.destinationUrl;
    if (ur.pathChange) {
      path = ur.newPath;
    }

    if (ur.destinationUrlChange) {
      destinationUrl = ur.newDestinationUrl;
    }

    this.urlRedirectionService.update(ur.urlRedirectionId, path, destinationUrl).subscribe(
      resp => {
        ur.path = path;
        ur.destinationUrl = destinationUrl;
        ur.editable = false;
        ur.contentEditable = false;
        ur.destinationUrlChange = false;
        ur.pathChange = false;
        this.makeTouchableAppList();
        ur.updateBtnClicked = false;
      },
      err => {
        console.log(err);
        alert(err.error.message);
        ur.updateBtnClicked = false;
      }
    );
    console.log(ur);
  }

  private makeTouchableAppList(): void {
    const editingShortcutForms = this.shortcutForms.filter(sf => sf.editable).length;
    const editingShortcuts = this.shortcuts.filter(s => s.editable).length;
    const editingUrlRedirectionForms = this.urlRedirectionForms.filter(uf => uf.editable).length;
    const editingUrlRedirections = this.urlRedirections.filter(u => u.editable).length;
    if (editingShortcutForms === 0 && editingShortcuts === 0 && editingUrlRedirectionForms === 0 && editingUrlRedirections === 0) {
      this.hideAddNewBtn = false;
      this.disableConnectedAppClick = false;
    }
  }
}
