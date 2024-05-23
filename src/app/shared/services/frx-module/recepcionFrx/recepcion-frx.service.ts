import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class RecepcionFrxService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/recepcion-frx';

  public recepcionFrxRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public recepcionFrxGetUno(cod_cotizacion: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.get<ApiResult>(url);
  }

  public recepcionFrxGet(): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.get<ApiResult>(url);
  }

  public recepcionFrxMiLista(user_asignado: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/mi-lista/' + user_asignado;
    return this.http.get<ApiResult>(url);
  }

  public recepcionFrxActualizar(cod_cotizacion: string, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.patch<ApiResult>(url, data);
  }
}
