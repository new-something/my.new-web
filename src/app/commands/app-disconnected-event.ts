export class AppDisconnectedEvent {
  appCode: number;

  constructor(appCode: number) {
    this.appCode = appCode;
  }
}
