export class AddToShortcutEvent {
  providedActionId: number;
  type: string;
  url: string;
  description: string;
  appIcon: string;
  connectedId: number;

  constructor(providedActionId: number, type: string, url: string, description: string, appIcon: string, connectedId: number) {
    this.providedActionId = providedActionId;
    this.type = type;
    this.url = url;
    this.description = description;
    this.appIcon = appIcon;
    this.connectedId = connectedId;
  }
}
