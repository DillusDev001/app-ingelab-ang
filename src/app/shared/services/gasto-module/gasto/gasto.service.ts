import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/gasto';

  public gastoRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public gastoGetLista(): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.get<ApiResult>(url);
  }

  public gastoGet(codigo_gasto: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + codigo_gasto;
    return this.http.get<ApiResult>(url);
  }

  public gastoGetBusqueda(attribute: string, value: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/busqueda/' + attribute + '/' + value;
    return this.http.get<ApiResult>(url);
  }

  public gastoActualizar(codigo_gasto: string, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + codigo_gasto;
    return this.http.patch<ApiResult>(url, data);
  }

  public gastoDelete(codigo_gasto: string, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + codigo_gasto;
    return this.http.patch<ApiResult>(url, data);
  }

  public findLastCode(area: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/last-code/' + area;
    return this.http.get<ApiResult>(url);
  }
}
