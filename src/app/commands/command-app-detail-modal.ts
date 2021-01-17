export class CommandAppDetailModal {
  appCode: number;
  hasBackModalStep: boolean;
  connected: boolean;

  constructor(appCode: number, hasBackModalStep: boolean, connected: boolean) {
    this.appCode = appCode;
    this.hasBackModalStep = hasBackModalStep;
    this.connected = connected;
  }
}
