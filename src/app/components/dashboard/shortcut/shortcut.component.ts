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
import {EditEventService} from '../../../services/edit-event.service';
import {EditEvent} from '../../../events/edit-event';
import {ResourceType} from '../../../events/resource-type.enum';

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit, OnDestroy {

  constructor(private modalEventService: ModalEventService, private shortcutService: ShortcutService,
              private urlRedirectionService: UrlRedirectionService, private editEventService: EditEventService) {
  }
  private pathRegExp = new RegExp('[a-z]{2,}(/[a-z|-]+)?(/[a-z|-]+)?');
  private urlRegExp = new RegExp('^(https?|chrome):\\/\\/[^\\s$.?#].[^\\s]*$');
  private needOrganizationActionIds = [{providedActionId: 40, appName: 'Confluence'}, {providedActionId: 69, appName: 'Jira'}];

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

  public editEventSubscription: Subscription;

  public isEditing = false;

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

  private static makePathToValid(text: string): string {
    return text.trim().replace(/ /g, '-').replace(/[^A-Za-z0-9_-]/g, '').toLowerCase();
  }

  public ngOnInit(): void {
    this.appConnectionSubscription = this.modalEventService.getAppConnectionEventPipe().subscribe(evt => {
      this.connectedApps.push(new ConnectedApp(evt.connectedId, evt.appCode, evt.appName, evt.appIcon, evt.domain, evt.description));
    });

    this.appDisconnectionSubscription = this.modalEventService.getAppDisconnectionEventPipe().subscribe(evt => {
      // tslint:disable-next-line:prefer-for-of
      let removeTargetIdx = 0;
      let connectedId = 0;
      for (let idx = 0; idx < this.connectedApps.length; idx++) {
        if (evt.appCode === this.connectedApps[idx].appCode) {
          removeTargetIdx = idx;
          connectedId = this.connectedApps[idx].connectedId;
          break;
        }
      }
      this.connectedApps.splice(removeTargetIdx, 1);
      this.shortcuts = this.shortcuts.filter(s => s.connectedId !== connectedId);
    });

    this.addToShortcutSubscription = this.modalEventService.getAddToShortcutEventPipe().subscribe(evt => {
      const shortcutFormId = ShortcutComponent.generateFormId();
      this.shortcutForms.push(new ShortcutForm(shortcutFormId,
        evt.providedActionId, evt.type, evt.url, evt.description,
        evt.appIcon, true, true, false, '', evt.connectedId));
      this.editEventService.publishEditEvent(EditEvent.formOf(ResourceType.SHORTCUT_FORM, shortcutFormId));
    });

    this.addToUrlRedirectionSubscription = this.modalEventService.getAddToUrlRedirectionEventPipe().subscribe(() => {
      const urlRedirectionId = ShortcutComponent.generateFormId();
      this.urlRedirectionForms.push(new UrlRedirectionForm(urlRedirectionId));
      this.editEventService.publishEditEvent(EditEvent.formOf(ResourceType.URL_REDIRECTION_FORM, urlRedirectionId));
    });

    this.editEventSubscription = this.editEventService.getEditEventPipe().subscribe((evt) => {
      this.makeUntouchableAppList();
      this.isEditing = true;
      switch (evt.type) {
        case ResourceType.SHORTCUT:
          this.shortcuts.forEach((s) => {
            if (s.shortcutId !== evt.id) {
              s.disabled = true;
            }
          });
          this.shortcutForms.forEach((sf) => {
            sf.disabled = true;
          });
          this.urlRedirections.forEach((u) => {
            u.disabled = true;
          });
          this.urlRedirectionForms.forEach((uf) => {
            uf.disabled = true;
          });
          break;
        case ResourceType.SHORTCUT_FORM:
          this.shortcuts.forEach((s) => {
            s.disabled = true;
          });
          this.shortcutForms.forEach((sf) => {
            if (sf.id !== evt.formId) {
              sf.disabled = true;
            }
          });
          this.urlRedirections.forEach((u) => {
            u.disabled = true;
          });
          this.urlRedirectionForms.forEach((uf) => {
            uf.disabled = true;
          });
          break;
        case ResourceType.URL_REDIRECTION:
          this.shortcuts.forEach((s) => {
            s.disabled = true;
          });
          this.shortcutForms.forEach((sf) => {
            sf.disabled = true;
          });
          this.urlRedirections.forEach((u) => {
            if (u.urlRedirectionId !== evt.id) {
              u.disabled = true;
            }
          });
          this.urlRedirectionForms.forEach((uf) => {
            uf.disabled = true;
          });
          break;
        case ResourceType.URL_REDIRECTION_FORM:
          this.shortcuts.forEach((s) => {
            s.disabled = true;
          });
          this.shortcutForms.forEach((sf) => {
            sf.disabled = true;
          });
          this.urlRedirections.forEach((u) => {
            u.disabled = true;
          });
          this.urlRedirectionForms.forEach((uf) => {
            if (uf.id !== evt.formId) {
              uf.disabled = true;
            }
          });
          break;
      }
    });
  }

  public ngOnDestroy(): void {
    this.appConnectionSubscription.unsubscribe();
    this.appDisconnectionSubscription.unsubscribe();
    this.addToShortcutSubscription.unsubscribe();
    this.addToUrlRedirectionSubscription.unsubscribe();
    this.editEventSubscription.unsubscribe();
  }

  public showAppListModal(): void {
    this.modalEventService.publishOpenAppListModal(new CommandAppListModal('ALL', true));
    this.hideBodyScrollbar();
  }

  public cAppClicked(appCode: number, connectedId: number): void {
    if (this.disableConnectedAppClick) {
      return;
    }
    this.modalEventService.publishOpenAppDetailModal(new CommandAppDetailModal(appCode, connectedId, true));
    this.hideBodyScrollbar();
  }

  public hideBodyScrollbar(): void {
    const body = document.querySelector('body');
    body.classList.add('no-overflow');
  }

  public shortcutFormPathCheck(event: any, sf: ShortcutForm): void {
    const input = event.target.textContent;
    sf.path = input;
    if (this.pathRegExp.test(input)) {
      sf.enableSaveBtn = true;
      return;
    }

    sf.enableSaveBtn = false;
  }

  public createShortcut(sf: ShortcutForm): void {
    if (sf.enableSaveBtn) {
      if (sf.createBtnClicked) {
        return;
      }

      sf.createBtnClicked = true;
      const path = ShortcutComponent.makePathToValid(sf.path);
      const needOrganization = this.needOrganizationActionIds.filter(n => n.providedActionId === sf.providedActionId).pop();
      let organization;
      if (needOrganization) {
        organization = prompt(`Please enter the organization ID of your ${needOrganization.appName} account. \nThe word placed before \'atlassian.net/...\' in the URL.`);
      }

      this.shortcutService.createShortcut(sf.connectedId, sf.providedActionId, path, organization).subscribe(
        s => {
          this.shortcuts = [s, ...this.shortcuts];
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
          this.makeAllResourceEnable();
          this.isEditing = false;
        },
        err => {
          console.log(err);
          alert(err.error.message);
          sf.createBtnClicked = false;
        });
      return;
    }
  }

  public makeShortcutFormEditable(sf: ShortcutForm): void {
    if (this.isEditing) {
      console.log('another resource editing.');
      return;
    }

    this.editEventService.publishEditEvent(EditEvent.formOf(ResourceType.SHORTCUT_FORM, sf.id));
    sf.editable = true;
    sf.contentEditable = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  public deleteShortcutForm(sf: ShortcutForm): void {
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
    this.makeAllResourceEnable();
    this.isEditing = false;
  }

  public makeShortcutEditable(s: Shortcut): void {
    if (this.isEditing) {
      console.log('another resource editing.');
      return;
    }

    this.editEventService.publishEditEvent(EditEvent.of(ResourceType.SHORTCUT, s.shortcutId));
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
    this.shortcutService.deleteShortcut(s.shortcutId).subscribe(
      () => {
        let removeTargetIdx = 0;
        for (let idx = 0; idx < this.shortcuts.length; idx++) {
          if (s.shortcutId === this.shortcuts[idx].shortcutId) {
            removeTargetIdx = idx;
            break;
          }
        }

        this.isEditing = false;
        this.shortcuts.splice(removeTargetIdx, 1);
        this.makeTouchableAppList();
        this.makeAllResourceEnable();
      },
      err => {
        console.log(err);
        alert(err.error.message);
        s.deleteBtnClicked = false;
      }
    );
  }

  public updateShortcut(s: Shortcut): void {
    // 새로 입력을 한 번도 하지 않고 변경 버튼 클릭
    if (!s.pathChange) {
      s.contentEditable = false;
      s.editable = false;
      this.makeTouchableAppList();
      this.makeAllResourceEnable();
      this.isEditing = false;
      return;
    }
    // 새로 입력을 했지만, 기존의 path 와 동일할 경우.
    if (s.path === s.newPath) {
      s.contentEditable = false;
      s.editable = false;
      this.makeTouchableAppList();
      this.makeAllResourceEnable();
      this.isEditing = false;
      return;
    }
    // 저장 버튼 활성화 및 기존 path 변경을 한 경우.
    if (s.enableSaveBtn && s.pathChange) {
      if (s.updateBtnClicked) {
        console.log('processing to update shortcut');
        return;
      }

      s.updateBtnClicked = true;
      const path = ShortcutComponent.makePathToValid(s.newPath);
      this.shortcutService.updateShortcut(s.shortcutId, path).subscribe(
        () => {
          s.path = path;
          s.contentEditable = false;
          s.editable = false;
          s.pathChange = false;
          s.updateBtnClicked = false;
          this.makeTouchableAppList();
          this.makeAllResourceEnable();
          this.isEditing = false;
        },
        err => {
          console.log(err);
          alert(err.error.message);
          s.updateBtnClicked = false;
        }
      );
    }
  }

  public shortcutPathCheck(event: any, s: Shortcut): void {
    const input = event.target.textContent;
    s.newPath = input;
    s.pathChange = true;
    if (this.pathRegExp.test(input)) {
      s.enableSaveBtn = true;
      return;
    }

    s.enableSaveBtn = false;
  }

  public makeUrlRedirectionEditable(ur: UrlRedirection): void {
    if (this.isEditing) {
      console.log('another resource editing.');
      return;
    }
    this.editEventService.publishEditEvent(EditEvent.of(ResourceType.URL_REDIRECTION, ur.urlRedirectionId));
    ur.contentEditable = true;
    ur.editable = true;
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  public makeUrlRedirectionFormEditable(uf: UrlRedirectionForm): void {
    if (this.isEditing) {
      console.log('another resource editing.');
      return;
    }
    this.editEventService.publishEditEvent(EditEvent.formOf(ResourceType.URL_REDIRECTION_FORM, uf.id));
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
    this.makeAllResourceEnable();
    this.makeTouchableAppList();
    this.isEditing = false;
  }

  public urlRedirectionFormPathCheck(event: any, uf: UrlRedirectionForm): void {
    const input = event.target.textContent;
    uf.path = input;
    if (this.urlRegExp.test(uf.destinationUrl) && this.pathRegExp.test(input)) {
      uf.enableSaveBtn = true;
      return;
    }
    uf.enableSaveBtn = false;
  }

  public urlRedirectionFormDestinationUrlCheck(event: any, uf: UrlRedirectionForm): void {
    const input = event.target.textContent;
    uf.destinationUrl = input;
    if (this.urlRegExp.test(input) && this.pathRegExp.test(uf.path)) {
      uf.enableSaveBtn = true;
      return;
    }
    uf.enableSaveBtn = false;
  }

  public createUrlRedirection(uf: UrlRedirectionForm): void {
    if (uf.destinationUrl.includes('my.new')) {
      alert('You can not use "my.new" in Destination!');
      return;
    }

    if (uf.createBtnClicked) {
      console.log('processing to create url redirection');
      return;
    }

    uf.createBtnClicked = true;
    const path = ShortcutComponent.makePathToValid(uf.path);
    this.urlRedirectionService.create(path, uf.destinationUrl).subscribe(
      resp => {
        this.urlRedirections = [resp, ...this.urlRedirections];
        this.deleteUrlRedirectionForm(uf);
        this.makeAllResourceEnable();
        this.isEditing = false;
      },
      err => {
        alert(err.error.message);
        console.log(err);
        uf.createBtnClicked = false;
      }
    );
  }

  public urlRedirectionPathCheck(event: any, ur: UrlRedirection): void {
    ur.newPath = event.target.textContent;
    ur.pathChange = true;
    // path 만 변경하고 destination 은 변경하지 않은 경우.
    if (ur.pathChange && !ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.destinationUrl)) {
        ur.enableSaveBtn = true;
        return;
      }
      ur.enableSaveBtn = false;
      return;
    }

    // path 는 변경하지 않고 destination 만 변경한 경우.
    if (!ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.path) && this.urlRegExp.test(ur.newDestinationUrl)) {
        ur.enableSaveBtn = true;
        return;
      }

      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경한 경우.
    if (ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.newDestinationUrl)) {
        ur.enableSaveBtn = true;
        return;
      }

      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경하지 않은 경우는 해당 function 을 사용하지 않는다.
  }

  public urlRedirectionDestinationUrlCheck(event: any, ur: UrlRedirection): void {
    ur.newDestinationUrl = event.target.textContent;
    ur.destinationUrlChange = true;
    // path 만 변경하고 destination 은 변경하지 않은 경우.
    if (ur.pathChange && !ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.destinationUrl)) {
        ur.enableSaveBtn = true;
        return;
      }
      ur.enableSaveBtn = false;
      return;
    }

    // path 는 변경하지 않고 destination 만 변경한 경우.
    if (!ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.path) && this.urlRegExp.test(ur.newDestinationUrl)) {
        ur.enableSaveBtn = true;
        return;
      }

      ur.enableSaveBtn = false;
      return;
    }

    // path 와 destination url 모두 변경한 경우.
    if (ur.pathChange && ur.destinationUrlChange) {
      if (this.pathRegExp.test(ur.newPath) && this.urlRegExp.test(ur.newDestinationUrl)) {
        ur.enableSaveBtn = true;
        return;
      }

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
    this.urlRedirectionService.delete(ur.urlRedirectionId).subscribe(
      () => {
        let removeTargetIdx = 0;
        for (let idx = 0; idx < this.urlRedirections.length; idx++) {
          if (ur.urlRedirectionId === this.urlRedirections[idx].urlRedirectionId) {
            removeTargetIdx = idx;
            break;
          }
        }
        this.urlRedirections.splice(removeTargetIdx, 1);
        this.makeTouchableAppList();
        this.makeAllResourceEnable();
        this.isEditing = false;
      },
      err => {
        console.log(err);
        alert(err.error.message);
        ur.deleteBtnClicked = false;
      }
    );
  }

  public updateUrlRedirection(ur: UrlRedirection): void {
    // path 와 destinationUrl 모두 변경하지 않은 경우.
    if (!ur.pathChange && !ur.destinationUrlChange) {
      ur.contentEditable = false;
      ur.editable = false;
      this.makeTouchableAppList();
      this.makeAllResourceEnable();
      this.isEditing = false;
      return;
    }
    // 변경은 했지만, 변경한 path 가 이전 path 와 동일하고, destination url 도 이전 destination url 과 동일할 경우.
    if (ur.path === ur.newPath && ur.destinationUrl === ur.newDestinationUrl) {
      ur.contentEditable = false;
      ur.editable = false;
      this.makeTouchableAppList();
      this.makeAllResourceEnable();
      this.isEditing = false;
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
      path = ShortcutComponent.makePathToValid(path);
    }

    if (ur.destinationUrlChange) {
      destinationUrl = ur.newDestinationUrl;
    }

    this.urlRedirectionService.update(ur.urlRedirectionId, path, destinationUrl).subscribe(
      () => {
        ur.path = path;
        ur.destinationUrl = destinationUrl;
        ur.editable = false;
        ur.contentEditable = false;
        ur.destinationUrlChange = false;
        ur.pathChange = false;
        ur.updateBtnClicked = false;
        this.makeTouchableAppList();
        this.makeAllResourceEnable();
        this.isEditing = false;
      },
      err => {
        console.log(err);
        alert(err.error.message);
        ur.updateBtnClicked = false;
      }
    );
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

  private makeUntouchableAppList(): void {
    this.hideAddNewBtn = true;
    this.disableConnectedAppClick = true;
  }

  private makeAllResourceEnable(): void {
    this.shortcuts.forEach((s) => {
      s.disabled = false;
    });
    this.shortcutForms.forEach((sf) => {
      sf.disabled = false;
    });
    this.urlRedirections.forEach((u) => {
      u.disabled = false;
    });
    this.urlRedirectionForms.forEach((uf) => {
      uf.disabled = false;
    });
  }
 }
