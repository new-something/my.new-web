export class UrlRedirection {
  urlRedirectionId: number;
  path: string;
  destinationUrl: string;

  constructor(urlRedirectionId: number, path: string, destinationUrl: string) {
    this.urlRedirectionId = urlRedirectionId;
    this.path = path;
    this.destinationUrl = destinationUrl;
  }
}
