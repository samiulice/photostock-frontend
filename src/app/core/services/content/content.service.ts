import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstService } from '../constants/const.service';
import { IMediaCategoryWithResp, IMediaListWithResp } from '../../interfaces/content.interface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private baseURL: string;
  private mediaURL: string;
  constructor(private http: HttpClient, private constant: ConstService) {
    this.baseURL = this.constant.url;
    this.mediaURL = this.constant.url + "/media";
  }

  getThumbnails(category: number = 0) {
    return this.http.get<IMediaListWithResp>(this.mediaURL + "?category=" + category)
  }

  createCategory(formData:FormData){
    return this.http.post<IMediaCategoryWithResp>(this.baseURL + '/categories', formData);
  }
}
