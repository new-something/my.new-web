export class CommandAppDetailModal {
  appCode: number;
  connectedId: number;
  connected: boolean;

  constructor(appCode: number, connectedId: number, connected: boolean) {
    this.appCode = appCode;
    this.connectedId = connectedId;
    this.connected = connected;
  }
}
