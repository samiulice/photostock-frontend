import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDownloadHistoryItem } from '../../../core/interfaces/history.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-download-history',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './download-history.html',
})
export class DownloadHistory {
  currentPage = 1;
  itemsPerPage = 5;

  allItems: IDownloadHistoryItem[] = [
    {
      id: 1,
      fileName: 'Nature.jpg',
      category: 'Photography',
      type: 'JPG',
      license: 'Premium',
      size: '2.4MB',
      resolution: '1920x1080',
      downloadedAt: '2025-07-06',
    },
    {
      id: 2,
      fileName: 'Cityscape.mp4',
      category: 'Video',
      type: 'MP4',
      license: 'Free',
      size: '18.3MB',
      resolution: '1280x720',
      downloadedAt: '2025-07-05',
    },
    {
      id: 3,
      fileName: 'Logo.ai',
      category: 'Graphics',
      type: 'AI',
      license: 'Premium',
      size: '1.1MB',
      resolution: 'N/A',
      downloadedAt: '2025-07-04',
    },
    {
      id: 4,
      fileName: 'SoundTrack.mp3',
      category: 'Audio',
      type: 'MP3',
      license: 'Free',
      size: '4.5MB',
      resolution: 'N/A',
      downloadedAt: '2025-07-03',
    },
    {
      id: 5,
      fileName: 'Banner.psd',
      category: 'Graphics',
      type: 'PSD',
      license: 'Premium',
      size: '7.2MB',
      resolution: '3000x1200',
      downloadedAt: '2025-07-02',
    },
    {
      id: 6,
      fileName: 'Mountain.jpg',
      category: 'Photography',
      type: 'JPG',
      license: 'Free',
      size: '3.0MB',
      resolution: '2560x1440',
      downloadedAt: '2025-07-01',
    },
    {
      id: 7,
      fileName: 'Forest.png',
      category: 'Photography',
      type: 'PNG',
      license: 'Free',
      size: '5.1MB',
      resolution: '2048x1365',
      downloadedAt: '2025-06-30',
    },
    {
      id: 8,
      fileName: 'Mockup.psd',
      category: 'Graphics',
      type: 'PSD',
      license: 'Premium',
      size: '6.8MB',
      resolution: '1920x1080',
      downloadedAt: '2025-06-29',
    },
    {
      id: 9,
      fileName: 'Icon Set.zip',
      category: 'Graphics',
      type: 'ZIP',
      license: 'Free',
      size: '9.4MB',
      resolution: 'N/A',
      downloadedAt: '2025-06-28',
    },
    {
      id: 10,
      fileName: 'Interview.mp4',
      category: 'Video',
      type: 'MP4',
      license: 'Premium',
      size: '22.7MB',
      resolution: '1080x720',
      downloadedAt: '2025-06-27',
    },
  ];

  get totalPages(): number {
    return Math.ceil(this.allItems.length / this.itemsPerPage);
  }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allItems.slice(start, start + this.itemsPerPage);
  }
  get startItemIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.allItems.length);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
