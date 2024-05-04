import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from '../../interfaces/api/api.result';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/app/sesion-module/usuario';
import { urlBaseApi } from '../../utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/usuario';

  public usuarioRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public usuarioGetLista(): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.get<ApiResult>(url);
  }

  public usuarioGetUser(user: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + user;
    return this.http.get<ApiResult>(url);
  }


}
