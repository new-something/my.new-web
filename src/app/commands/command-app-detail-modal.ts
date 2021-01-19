export class CommandAppDetailModal {
  appCode: number;
  hasBackModalStep: boolean;
  connectedId: number;
  connected: boolean;

  constructor(appCode: number, hasBackModalStep: boolean, connectedId: number, connected: boolean) {
    this.appCode = appCode;
    this.hasBackModalStep = hasBackModalStep;
    this.connectedId = connectedId;
    this.connected = connected;
  }
}
