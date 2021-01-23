export class ShortcutForm {
  id: string;
  providedActionId: number;
  type: string;
  url: string;
  description: string;
  appIcon: string;
  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;
  path: string;
  connectedId: number;

  createBtnClicked = false;

  constructor(id: string, providedActionId: number, type: string, url: string,
              description: string, appIcon: string, editable: boolean,
              contentEditable: boolean, enableSaveBtn: boolean, path: string,
              connectedId: number) {
    this.id = id;
    this.providedActionId = providedActionId;
    this.type = type;
    this.url = url;
    this.description = description;
    this.appIcon = appIcon;
    this.editable = editable;
    this.contentEditable = contentEditable;
    this.enableSaveBtn = enableSaveBtn;
    this.path = path;
    this.connectedId = connectedId;

    this.createBtnClicked = false;
  }
}
