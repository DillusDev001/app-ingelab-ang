import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../interfaces/api/api.result';
import { urlBaseApi } from '../../utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/servicio';

  public servicioRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public servicioGetLista(): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.get<ApiResult>(url);
  }

  public servicioGetByNombre(nombre: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + nombre;
    return this.http.get<ApiResult>(url);
  }

  public servicioGetListaByTipoServicio(id_tipo_servicio: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/tipo-servicio/' + id_tipo_servicio;
    return this.http.get<ApiResult>(url);
  }

  public servicioActualizar(id: number, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id;
    return this.http.patch<ApiResult>(url, data);
  }
}
