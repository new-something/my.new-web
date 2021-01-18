export class ShortcutForm {
  providedActionId: number;
  type: string;
  url: string;
  description: string;
  appIcon: string;
  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;

  constructor(providedActionId: number, type: string, url: string,
              description: string, appIcon: string, editable: boolean,
              contentEditable: boolean, enableSaveBtn: boolean) {
    this.providedActionId = providedActionId;
    this.type = type;
    this.url = url;
    this.description = description;
    this.appIcon = appIcon;
    this.editable = editable;
    this.contentEditable = contentEditable;
    this.enableSaveBtn = enableSaveBtn;
  }
}
