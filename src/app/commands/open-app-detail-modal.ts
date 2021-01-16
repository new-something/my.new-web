export class OpenAppDetailModal {
  appCode: number;
  hasBackModalStep: boolean;

  constructor(appCode: number, hasBackModalStep: boolean) {
    this.appCode = appCode;
    this.hasBackModalStep = hasBackModalStep;
  }
}
