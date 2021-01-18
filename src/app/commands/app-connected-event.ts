export class AppConnectedEvent {
  appCode: number;
  connectedId: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  constructor(appCode: number,
              connectedId: number,
              appName: string, appIcon: string,
              domain: string, description: string) {
    this.appCode = appCode;
    this.connectedId = connectedId;
    this.appName = appName;
    this.appIcon = appIcon;
    this.domain = domain;
    this.description = description;
  }
}
