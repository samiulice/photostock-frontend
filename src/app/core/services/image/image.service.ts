import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMedia, IMediaWithResp } from '../../interfaces/content.interface';
import { ConstService } from '../constants/const.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  baseURL: string;

  constructor(private http: HttpClient, private constantService: ConstService) {
    this.baseURL = constantService.url;
  }

  getImageById(id: string) {
    return this.http.get<IMediaWithResp>(this.baseURL + '/media/details?id=' + id);
  }

  downloadImage(imageId: number) {
    const params = new HttpParams()
      .set('id', imageId);

    return this.http.get(this.baseURL+'/media/premium', {
      params,
      responseType: 'blob', // Important to handle binary data
      observe: 'response'   // To access headers if needed
    });
  }
}
