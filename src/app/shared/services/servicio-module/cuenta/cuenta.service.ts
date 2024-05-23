import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { urlBaseApi } from 'src/app/shared/utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/cuenta';

  public cuentaRegistro(data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule;
    return this.http.post<ApiResult>(url, data);
  }

  public cuentaGet(id_servicio: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id_servicio;
    return this.http.get<ApiResult>(url);
  }

  public cuentaActualizar(id_cuenta: string, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id_cuenta;
    return this.http.patch<ApiResult>(url, data);
  }

  public upload(formData: FormData, fileName: string) {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/upload';
    return this.http.post<ApiResult>(url, formData, {
      headers: {
        'my-filename': fileName
      },
      reportProgress: true,
      observe: 'events'
    });
  }
}
