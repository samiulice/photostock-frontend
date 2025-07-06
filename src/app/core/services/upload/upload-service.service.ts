import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResp } from '../../interfaces/auth.interface';
import { IMediaCategoryListResp } from '../../interfaces/content.interface';
import { ConstService } from '../constants/const.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl: string;
  constructor(private http: HttpClient, private constant: ConstService) {
    this.uploadUrl = this.constant.url;
  }




  getCategories() {
    console.log("Fetching categories.....")
    return this.http.get<IMediaCategoryListResp>(this.uploadUrl + '/categories'); // Replace with your API URL

  }

  uploadImage(obj: FormData) {
    return this.http.post<IResp>(this.uploadUrl + '/media', obj)
  }


}
