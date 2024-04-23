import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../interfaces/api/api.result';
import { Code } from '../../interfaces/app/code';
import { urlBaseApi } from '../../utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/code';

  public addCode(code: Code): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + code;
    return this.http.post<ApiResult>(url, code);
  }

  public getCode(code: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + code;
    return this.http.get<ApiResult>(url);
  }

  public getCodeLista(user: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/lista/' + user;
    return this.http.get<ApiResult>(url);
  }

  public updateCode(id: number, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id;
    return this.http.patch<ApiResult>(url, data);
  }

  public deleteCode(id: number): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + id;
    return this.http.delete<ApiResult>(url);
  }
}
