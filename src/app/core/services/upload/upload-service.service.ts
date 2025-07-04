import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  private uploadUrl = 'https://photostock-api-v1.onrender.com/upload'; // your API endpoint

  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData) {
    return this.http.post(this.uploadUrl, formData);
  }
  getCategories() {
  return this.http.get<{ id: number; name: string }[]>(this.uploadUrl); // Replace with your API URL
}

}
