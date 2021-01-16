import {ProvidedAction} from './provided-action';

export class ProvidedAppDetail {
  appCode: number;
  appName: string;
  appIcon: string;
  domain: string;
  description: string;

  providedActions: ProvidedAction[];

  constructor(appCode: number, appName: string, appIcon: string, domain: string, description: string, providedActions: ProvidedAction[]) {
    this.appCode = appCode;
    this.appName = appName;
    this.appIcon = appIcon;
    this.domain = domain;
    this.description = description;
    this.providedActions = providedActions;
  }
}
