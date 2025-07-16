import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IUploadHistory } from '../../../core/interfaces/history.interface';
import { HistoryService } from '../../../core/services/history/history.service';
import { ErrorHandlerService } from '../../../core/services/errorHandler/error-handler.service';


@Component({
  selector: 'app-upload-history',
  imports: [CommonModule],
  templateUrl: './upload-history.html',
  styleUrl: './upload-history.css',
})
export class UploadHistory implements OnInit{

  uploadHistory:IUploadHistory[] = []
  isLoading:boolean = true
  constructor(private history: HistoryService, private errorHandler:ErrorHandlerService) {}

  ngOnInit(): void {
      this.history.getUploadHistory().subscribe((res)=>{
        this.errorHandler.notifyUser(res.error, res.message, ()=>{
          console.log("upload history fetch successfully: Message from anonymous function");
          this.uploadHistory = res.history || [];
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
