import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class MuestraFrxService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/muestra-frx';

  public muestraAdd(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public muestraGet(cod_cotizacion: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.get<ApiResult>(url);
  }

  public muestraDelete(cod_cotizacion: string, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.patch<ApiResult>(url, data);
  }
}
