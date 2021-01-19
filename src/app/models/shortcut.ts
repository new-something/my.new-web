export class Shortcut {
  shortcutId: number;
  path: string;
  destinationUrl: string;
  type: string;
  description: string;
  appIcon: string;

  connectedId: number;

  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;

  constructor(shortcutId: number, path: string, destinationUrl: string, type: string, description: string,
              appIcon: string, connectedId: number) {
    this.shortcutId = shortcutId;
    this.path = path;
    this.destinationUrl = destinationUrl;
    this.type = type;
    this.description = description;
    this.appIcon = appIcon;
    this.connectedId = connectedId;

    this.editable = false;
    this.contentEditable = false;
    this.enableSaveBtn = false;
  }
}
