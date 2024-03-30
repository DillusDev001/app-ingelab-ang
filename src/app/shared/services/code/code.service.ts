import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from '../../interfaces/api/api.result';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'http://localhost:3000';
  urlVersion: string = '/v1';
  urlModule: string = '/code';

  public authLogin(code: string): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + code;
    return this.http.get<ApiResult>(url);
  }
}
