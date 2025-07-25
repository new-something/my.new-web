export class Shortcut {
  shortcutId: number;
  path: string;
  destinationUrl: string;
  type: string;
  description: string;
  appIcon: string;

  connectedId: number;

  newPath = '';
  pathChange = false;
  editable = false;
  contentEditable = false;
  enableSaveBtn = false;

  updateBtnClicked = false;
  deleteBtnClicked = false;

  disabled = false;

  constructor(shortcutId: number, path: string, destinationUrl: string, type: string, description: string,
              appIcon: string, connectedId: number) {
    this.shortcutId = shortcutId;
    this.path = path;
    this.destinationUrl = destinationUrl;
    this.type = type;
    this.description = description;
    this.appIcon = appIcon;
    this.connectedId = connectedId;

    this.newPath = '';
    this.pathChange = false;
    this.editable = false;
    this.contentEditable = false;
    this.enableSaveBtn = false;

    this.updateBtnClicked = false;
    this.deleteBtnClicked = false;

    this.disabled = false;
  }
}
