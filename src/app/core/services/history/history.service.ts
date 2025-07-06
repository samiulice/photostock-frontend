import { Injectable } from '@angular/core';
import { ConstService } from '../constants/const.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyURL:string
  constructor(private constant: ConstService) {
      this.historyURL = this.constant.url + '/auth';
    }
  
}
