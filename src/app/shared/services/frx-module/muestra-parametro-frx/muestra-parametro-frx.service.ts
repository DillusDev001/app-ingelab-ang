import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class MuestraParametroFrxService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/muestra-parametro-frx';

  public muestraParametroAdd(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public muestraParametroGet(cod_cotizacion: string, muestra_sec: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion + '/' + muestra_sec;
    return this.http.get<ApiResult>(url);
  }

  public muestraParametroDelete(cod_cotizacion: string, muestra_sec: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.delete<ApiResult>(url);
  }
  
}
