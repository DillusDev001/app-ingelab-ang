import { Injectable } from '@angular/core';
import { Contacto } from '../../interfaces/app/contacto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../../interfaces/api/api.result';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  urlBase: string = 'http://localhost:3000';
  urlVersion: string = '/v1';
  urlModule: string = '/contacto';

  public contactoRegistro(user: string, array:Contacto[]): Observable<ApiResult> {
    const url = this.urlBase + this.urlVersion + this.urlModule + '/' + user;
    return this.http.post<ApiResult>(url, array);
  }
}
