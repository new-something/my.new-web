export class ProvidedAction {
  public providedActionId: number;
  public type: string;
  public url: string;
  public description: string;

  constructor(providedActionId: number, type: string, url: string, description: string) {
    this.providedActionId = providedActionId;
    this.type = type;
    this.url = url;
    this.description = description;
  }
}
