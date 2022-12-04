import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import * as _ from 'lodash';
import { catchError, filter } from 'rxjs/operators';
import { SingletonService } from './singleton.service';
// tslint:disable-next-line:class-name
export interface authHttpExtras {
  baseUrl?: string;
  progress?: string; // can be "both", "upload", "download", ""
  loader?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  [propName: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  BASE_URL$ = environment.credentials().BASE_URL;

  constructor(private httpClient: HttpClient, private ss: SingletonService) {}

  request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: object | any,
    params?: any | object | '' | string | HttpParams,
    headers?: any | object | HttpHeaders,
    loaderText?: 'Loading',
    responseOptions: any | authHttpExtras = {}
  ): Observable<HttpResponse<any>> {
    // tslint:disable-next-line:no-shadowed-variable
    const authHttpExtras = {
      baseUrl: this.BASE_URL$,
      loader: true,
      progress: '',
      responseType: 'json',
    };

    let actualParams: HttpParams;

    // Modify the Params
    if (params instanceof Object) {
      if (params instanceof HttpParams) {
        actualParams = params;
      } else {
        actualParams = new HttpParams();
      }
    } else if (typeof params === 'string') {
      actualParams = new HttpParams();

      if (params !== '') {
        const collections = params?.split('&');
        _.forEach(collections, (value) => {
          const [key, val] = value?.split('=');
          actualParams.append(key + '', val + '');
        });
      }
    } else {
      actualParams = new HttpParams();
    }

    // Modify the Headers
    let actualHeaders: HttpHeaders;

    if (headers instanceof Object) {
      if (headers instanceof HttpHeaders) {
        actualHeaders = headers;
      } else if (headers === Object) {
        actualHeaders = new HttpHeaders();
      } else {
        _.forEach(headers, (key, value) => {
          actualHeaders.append(key, value);
        });
      }
    } else {
      actualHeaders = new HttpHeaders();
    }

    const endPoint = `${authHttpExtras.baseUrl}${url}`;
    const modifiedOptions: authHttpExtras = _.assign(
      authHttpExtras,
      responseOptions
    );

    const httpRequest = this.httpClient.request(
      new HttpRequest(method, endPoint, body, {
        headers: actualHeaders,
        reportProgress: false,
        params: actualParams,
        responseType: modifiedOptions?.responseType,
      })
    );

    return httpRequest.pipe(
      filter((event) => {
        switch (event.type) {
          case HttpEventType.Sent:
            this.ss.loader?.show();
            return false;

          case HttpEventType.Response:
            this.ss.loader?.hide();
            return true;

          default:
            return true;
        }
      }),
      catchError((err) => {
        console.log(err);
        this.ss.loader?.hide();
        return [err];
      })
    );
  }
}
