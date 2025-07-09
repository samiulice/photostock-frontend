import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

 constructor(private http: HttpClient) {}

  getImageById(id: string) {
    return this.http.get<ImageData>(`/api/images/${id}`);
  }
}
