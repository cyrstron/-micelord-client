import { extendGoogleApi } from './extentions';

export class GoogleMapsActions {
  constructor(private apiKey: string) {}

  loadApi(): Promise<void> {
    const script: HTMLScriptElement = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://maps.google.com/maps/api/js?key=${this.apiKey}`;
    document.body.append(script);

    return new Promise<void>((res, rej) => {
      script.addEventListener('load', () => {        
        res();
      });
      script.addEventListener('error', (): void => {
        rej(new Error('Failed to load resource'));
      });
    });
  }

  extendApi(google: Google): void {
    extendGoogleApi(google);
  }
}
