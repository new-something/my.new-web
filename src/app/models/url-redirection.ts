export class UrlRedirection {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;

  newPath: string;
  newDestinationUrl: string;
  pathChange: boolean;
  destinationUrlChange: boolean;

  editable: boolean;
  contentEditable: boolean;
  enableSaveBtn: boolean;

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
    this.enableSaveBtn = false;
  }
}
