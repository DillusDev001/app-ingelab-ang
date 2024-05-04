import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class CotizacionGeneralSubServicioService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/cotizacion-general-sub-servicio';

  public cotizacionSubServicioAdd(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public cotizacionSubServicioGet(cod_cotizacion: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.get<ApiResult>(url);
  }

  public cotizacionSubServicioDelete(cod_cotizacion: string, id_sub_servicio: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + cod_cotizacion;
    return this.http.delete<ApiResult>(url);
  }

}
