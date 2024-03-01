import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResult } from '../../interfaces/api/api.result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'http://localhost:3000/';

  public getUsuarios(): Observable<ApiResult> {
    const url = this.urlBase + 'api/usuarios';
    return this.http.get<ApiResult>(url);
  }
}
