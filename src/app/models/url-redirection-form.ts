export class UrlRedirectionForm {
  id: string;
  path: string;
  destinationUrl: string;

  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;

  createBtnClicked = false;

  constructor(id: string) {
    this.id = id;
    this.path = '';
    this.destinationUrl = '';
    this.editable = true;
    this.contentEditable = true;
    this.enableSaveBtn = false;
    this.createBtnClicked = false;
  }
}
