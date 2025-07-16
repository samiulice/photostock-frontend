import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IDownloadHistory } from '../../../core/interfaces/history.interface';
import { HistoryService } from '../../../core/services/history/history.service';
import { ErrorHandlerService } from '../../../core/services/errorHandler/error-handler.service';


@Component({
  selector: 'app-download-history',
  imports: [CommonModule],
  templateUrl: './download-history.html',
  styleUrl: './download-history.css',
})
export class DownloadHistory implements OnInit{

  downloadHistory:IDownloadHistory[] = [];
  isLoading = true;

  constructor(private history: HistoryService, private errorHandler:ErrorHandlerService) {}

  ngOnInit(): void {
      this.history.getDownloadHistory().subscribe((res)=>{
        this.errorHandler.notifyUser(res.error, res.message, ()=>{
          console.log("download history fetch successfully: Message from anonymous function");
          this.downloadHistory = res.history || [];
          this.isLoading = false;
        })
      })
  }

  getStatusBadgeClass(status: boolean): string {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  getStatusColor(status: boolean): string {
    return status ? 'status-active' : 'status-cancelled';
  }
}
