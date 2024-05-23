import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBaseApi } from '../../../utils/local.string';
import { ApiResult } from '../../../interfaces/api/api.result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubServicioService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/sub-servicio';

  public subServicioRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public subServicioGetLista(id_servicio: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id_servicio;
    return this.http.get<ApiResult>(url);
  }

  public subServicioActualizar(id_sub_servicio: number, id_servicio: number, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id_sub_servicio + '/' + id_servicio;
    return this.http.patch<ApiResult>(url, data);
  }
}
