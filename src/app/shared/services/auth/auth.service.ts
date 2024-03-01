import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../interfaces/api/api.result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'http://localhost:3000/';

  public authLogin(user: string, pass: string): Observable<ApiResult> {
    const url = this.urlBase + 'api/auth/' + user + '/' + pass;
    return this.http.get<ApiResult>(url);
  }

  public authGotPassword(data: any): Observable<ApiResult> {
    const url = this.urlBase + 'api/auth/forgot';
    return this.http.post<ApiResult>(url, data);
  }

  public authRegister(data:any): Observable<ApiResult> {
    const url = this.urlBase + 'api/auth/register';
    return this.http.post<ApiResult>(url, data);
  }

}
