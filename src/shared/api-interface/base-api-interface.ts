import { Constructor } from 'src/@type/util';

export abstract class BaseApiInterface {
  public abstract paramsDTO: any;
  public abstract queryDTO: any;
  public abstract bodyDTO: any;
  public abstract readonly url: string;
  public abstract readonly method: METHOD;
  public abstract readonly responseDTOClass: Constructor<any>;

  public get interpolatedUrl(): string {
    let url = this.url;
    if (this.paramsDTO) {
      Object.keys(this.paramsDTO).forEach(key => {
        url = url.replace(':' + key, String(this.paramsDTO[key]));
      });
    }
    if (this.queryDTO) {
      Object.keys(this.queryDTO).forEach((key, index) => {
        if (this.queryDTO[key]) {
          url +=
            (index === 0 ? '?' : '&') + key + '=' + String(this.queryDTO[key]);
        }
      });
    }
    return url;
  }
}

export class ResponseApiInterface<T> {
	public instanceId?: string;

	constructor(
		public data: T,
		public message: string,
		public systemCode: string,
		public debugError?: T,
	) {
	}
}

export enum METHOD {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  GET = 'PUT',
}
