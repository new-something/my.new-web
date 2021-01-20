export class UrlRedirection {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;

  newPath = '';
  newDestinationUrl = '';
  pathChange = false;
  destinationUrlChange = false;

  editable = false;
  contentEditable = false;
  enableSaveBtn = true;

  constructor(urlRedirectionId: number, path: string, destinationUrl: string) {
    this.urlRedirectionId = urlRedirectionId;
    this.path = path;
    this.destinationUrl = destinationUrl;

    this.newPath = '';
    this.newDestinationUrl = '';
    this.pathChange = false;
    this.destinationUrlChange = false;

    this.editable = false;
    this.contentEditable = false;
    this.enableSaveBtn = true;
  }
}
