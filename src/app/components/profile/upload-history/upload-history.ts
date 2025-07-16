import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileService } from '../../../core/services/profile/profile.service';
import {
  IUploadHistoryItem,
  UploadHistoryItem,
} from '../../../core/interfaces/history.interface';

@Component({
  selector: 'app-upload-history',
  imports: [CommonModule],
  templateUrl: './upload-history.html',
  styleUrl: './upload-history.css',
})
export class UploadHistory {
  uploadHistory: UploadHistoryItem[] =  [
  {
    fileType: 'PDF',
    fileName: 'project-report.pdf',
    category: 'Documents',
    fileSize: 1048576, // 1 MB
    uploadDate: '2025-07-14',
    status: true
  },
  {
    fileType: 'JPG',
    fileName: 'design-mockup.jpg',
    category: 'Images',
    fileSize: 512000, // 500 KB
    uploadDate: '2025-07-15',
    status: true
  },
  {
    fileType: 'MP4',
    fileName: 'promo-video.mp4',
    category: 'Videos',
    fileSize: 52428800, // 50 MB
    uploadDate: '2025-07-12',
    status: false
  },
  {
    fileType: 'DOCX',
    fileName: 'meeting-notes.docx',
    category: 'Documents',
    fileSize: 256000, // 250 KB
    uploadDate: '2025-07-10',
    status: true
  },
  {
    fileType: 'PNG',
    fileName: 'logo.png',
    category: 'Graphics',
    fileSize: 102400, // 100 KB
    uploadDate: '2025-07-08',
    status: false
  }
];

  constructor(private profileService: ProfileService) {}
  formatFileSize(bytes: number): string {
    return this.profileService.formatFileSize(bytes);
  }
  getStatusBadgeClass(status: boolean): string {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  getStatusColor(status: boolean): string {
    return status ? 'status-active' : 'status-cancelled';
  }
}
