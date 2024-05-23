import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgServiceService {

  constructor(private http: HttpClient) { }

  getImageBase64(imageUrl: string): Observable<string> {
    return new Observable(observer => {
      this.http.get(imageUrl, { responseType: 'blob' }).subscribe(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          observer.next(reader.result as string);
          observer.complete();
        };
        reader.readAsDataURL(blob);
      }, err => {
        observer.error(err);
      });
    });
  }
}
