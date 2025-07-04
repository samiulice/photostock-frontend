// download-history.component.ts
import { Component } from '@angular/core';
import { IDownloadHistory } from '../../../core/interfaces/auth.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-download-history',
  imports: [CommonModule],
  templateUrl: './download-history.html',
  styleUrl: './download-history.css'

})
export class DownloadHistory {
  downloadHistory: IDownloadHistory[] = [
    {
      id: 1,
      fileName: 'report.pdf',
      fileType: 'PDF',
      downloadedAt: new Date('2025-06-29T12:00:00'),
      sizeMB: 2.5,
    },
    {
      id: 2,
      fileName: 'invoice.xlsx',
      fileType: 'Excel',
      downloadedAt: new Date('2025-06-28T09:30:00'),
      sizeMB: 1.1,
    },
    // Add more...
  ];
}
