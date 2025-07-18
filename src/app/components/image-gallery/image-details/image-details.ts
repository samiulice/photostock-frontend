import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ImageService } from '../../../core/services/image/image.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ConstService } from '../../../core/services/constants/const.service';
import { IMedia } from '../../../core/interfaces/content.interface';
import { IUserWithID } from '../../../core/interfaces/user.interface';

@Component({
  standalone: true,
  selector: 'app-image-detail',
  templateUrl: './image-details.html',
  styleUrls: ['./image-details.css'],
  imports: [CommonModule, RouterModule],
})
export class ImageDetails implements OnInit {
  imageData!: IMedia;
  user!: IUserWithID;
  hostURL: string;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private authService: AuthService,
    private constantService: ConstService
  ) {
    this.hostURL = this.constantService.getHostURL();
  }

  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchImageData(id);
      }
    });
  }

  private loadUserFromLocalStorage(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  private fetchImageData(id: string): void {
    this.imageService.getImageById(id).subscribe({
      next: (data) => {
        if (data.error) {
          alert(data.message);
          return;
        }
        this.imageData = data.media;
        console.log('Fetched image data:', this.imageData);
      },
      error: (err) => {
        console.error('Error fetching image:', err);
        alert('Failed to load image details.');
      },
    });
  }

  handleDownload(): void {
    this.isLoading = true;

    if (!this.imageData) {
      alert('No image data found.');
      return;
    }

    // 1. Check if user is logged in
    if (!this.authService.hasToken()) {
      this.redirectToLogin();
      return;
    }

    // 2. Free license image
    if (this.imageData.license_type === 0) {
      this.downloadFullResolution(this.imageData.id);
      return;
    }

    // 3. Premium: check subscription
    if (!this.hasValidSubscription()) {
      this.downloadWatermarkedPreview();
    } else {
      this.downloadFullResolution(this.imageData.id);
    }
  }

  private redirectToLogin(): void {
    this.router.navigate(['/login'], {
      queryParams: { redirectTo: `/image-details/${this.imageData?.id}` },
    });
  }

  private hasValidSubscription(): boolean {
    return this.user?.subscription_id !== null && this.user?.subscription_id > 0;
  }

   downloadWatermarkedPreview(): void {
    let url = this.imageData?.media_url ?? '';

    if (!url) {
      alert('Image URL is not available.');
      return;
    }

    // Convert thumbnail path to watermarked version
    url = url.replace('/thumbnails/', '/watermarked/').replace('thumb_', 'wm_');

    const a = document.createElement('a');
    a.href = url;
    a.download = 'watermarked-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private downloadFullResolution(id: number): void {
    this.imageService.downloadImage(id).subscribe({
      next: (response) => {
        const blob = new Blob([response.body!], { type: 'application/octet-stream' });
        const downloadUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = downloadUrl;

        const contentDisposition = response.headers.get('Content-Disposition');
        const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : `${id}.jpg`;

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);

        setTimeout(() => {
          this.isLoading = false;
        }, 1000); 
      },
      error: (error) => {
        console.error('Download failed:', error);
        alert('You need a valid subscription to download this image.');
        setTimeout(() => {
          this.isLoading = false;
        }, 1000); 
      },
    });
  }
}
