import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlBaseApi } from '../../../utils/local.string';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../interfaces/api/api.result';

@Injectable({
  providedIn: 'root'
})
export class TipoServicioService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/tipo-servicio';

  public tipoServicioRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public tipoServicioGetLista(): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.get<ApiResult>(url);
  }

  public tipoServicioGetByNombre(nombre: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + nombre;
    return this.http.get<ApiResult>(url);
  }

  public tipoServicioActualizar(id: number, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id;
    return this.http.patch<ApiResult>(url, data);
  }
}
