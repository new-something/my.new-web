export class CommandAppDetailModal {
  appCode: number;
  hasBackModalStep: boolean;

  constructor(appCode: number, hasBackModalStep: boolean) {
    this.appCode = appCode;
    this.hasBackModalStep = hasBackModalStep;
  }
}
