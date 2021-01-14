export class ConnectedApp {
  connectedId: number;
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  constructor(connectedId: number, appCode: number, appName: string, appIcon: string, domain: string, description: string) {
    this.connectedId = connectedId;
    this.appCode = appCode;
    this.appName = appName;
    this.appIcon = appIcon;
    this.domain = domain;
    this.description = description;
  }
}
