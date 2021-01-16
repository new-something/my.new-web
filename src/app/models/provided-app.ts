export class ProvidedApp {
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  connected: boolean;
  connectedId: number;

  constructor(appCode: number, appName: string, appIcon: string, domain: string,
              description: string, connected: boolean, connectedId: number) {
    this.appCode = appCode;
    this.appName = appName;
    this.appIcon = appIcon;
    this.domain = domain;
    this.description = description;
    this.connected = connected;
    this.connectedId = connectedId;
  }
}
