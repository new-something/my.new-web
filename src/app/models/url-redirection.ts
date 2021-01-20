export class UrlRedirection {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;

  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;

  constructor(urlRedirectionId: number, path: string, destinationUrl: string) {
    this.urlRedirectionId = urlRedirectionId;
    this.path = path;
    this.destinationUrl = destinationUrl;

    this.editable = false;
    this.contentEditable = false;
    this.enableSaveBtn = false;
  }
}
