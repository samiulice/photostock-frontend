import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResp } from '../../interfaces/auth.interface';
import { IMediaCategoryListResp } from '../../interfaces/content.interface';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = 'https://photostock-api-v1.onrender.com/api/v1';
   // your API endpoint

  constructor(private http: HttpClient) {}



  getCategories() {
    console.log("Fetching categories.....")
    return this.http.get<IMediaCategoryListResp>(this.uploadUrl+'/categories'); // Replace with your API URL
    
  }

  uploadImage(obj:FormData){
    return this.http.post<IResp>(this.uploadUrl+'/media',obj)
  }

  
}
