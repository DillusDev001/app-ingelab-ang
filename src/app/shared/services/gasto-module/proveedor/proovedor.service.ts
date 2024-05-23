import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class ProovedorService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/Proveedor';

  public proovedorRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public proovedorGetBy(attribute: string, value: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + attribute + '/' + value;
    return this.http.get<ApiResult>(url);
  }

  public proovedorGetLista(): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.get<ApiResult>(url);
  }

  public proovedorActualizar(id: number, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id;
    return this.http.patch<ApiResult>(url, data);
  }

}
