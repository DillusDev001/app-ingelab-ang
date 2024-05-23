import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../../interfaces/api/api.result';
import { urlBaseApi } from '../../../utils/local.string';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  urlBase: string = urlBaseApi;
  urlVersion: string = '/v1';
  urlModule: string = '/auth';

  public authLogin(user: string, pass: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/login/' + user + '/' + pass;
    return this.http.get<ApiResult>(url);
  }

  public authForGotPassword(user: string, data: any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + user;
    return this.http.patch<ApiResult>(url, data);
  }

  public authRegistro(data:any): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '';
    return this.http.post<ApiResult>(url, data);
  }

}
