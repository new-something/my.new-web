export class UrlRedirectionForm {
  id: string;
  path: string;
  destinationUrl: string;

  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;

  constructor(id: string) {
    this.id = id;
    this.path = '';
    this.destinationUrl = '';
    this.editable = false;
    this.contentEditable = false;
    this.enableSaveBtn = false;
  }
}
