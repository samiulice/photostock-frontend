import { Injectable } from '@angular/core';
import { ConstService } from '../constants/const.service';
import { HttpClient } from '@angular/common/http';
import { IDownloadHistoryListWithResp, IUploadHistoryListWithResp } from '../../interfaces/history.interface';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private baseURL: string
  constructor(private constant: ConstService, private http:HttpClient) {
    this.baseURL = this.constant.url;
  }


  //upload history
  getUploadHistory(){
    return this.http.get<IUploadHistoryListWithResp>(this.baseURL + "/history/upload")
  }
  //download history
  getDownloadHistory(){
    return this.http.get<IDownloadHistoryListWithResp>(this.baseURL + "/history/download")
  }

}
