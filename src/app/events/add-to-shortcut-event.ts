export class AddToShortcutEvent {
  providedActionId: number;
  type: string;
  url: string;
  description: string;
  appIcon: string;

  constructor(providedActionId: number, type: string, url: string, description: string, appIcon: string) {
    this.providedActionId = providedActionId;
    this.type = type;
    this.url = url;
    this.description = description;
    this.appIcon = appIcon;
  }
}
