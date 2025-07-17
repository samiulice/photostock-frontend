import { CommonModule, JsonPipe } from '@angular/common';
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
  imageData: IMedia | undefined;
  user!: IUserWithID;
  hostURL: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
    private authService: AuthService,
    private constantService: ConstService,
  ) {
    this.hostURL = constantService.getHostURL();
  }

  ngOnInit(): void {
    const u = localStorage.getItem('user');
    if (u) {
      this.user = JSON.parse(u);
    }
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.getImageData(id);
      }
    });
  }

  getImageData(id: string) {
    this.imageService.getImageById(id).subscribe((data) => {
      console.log(data);
      if (data.error) {
        alert(data.message);
        return;
      }
      this.imageData = data.media;
      console.log("Fetched image data: ", this.imageData)
    });
  }

  handleDownload() {
    let url: string = '';
    if (!this.imageData) {
      return;
    }
    // check user login status
    //if not logged in, redirect to login page
    if (!this.authService.hasToken()) {
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: `/image-details/${this.imageData?.id}` },
      });
      return;
    }
    //after login ,, redirect to the current page

    //check license type
    //if lic_type == 0, download it for free

    if (this.imageData.license_type == 0) {
      const url = this.imageData.media_url;
      const a = document.createElement('a');
      a.href = url;
      a.download = 'original-image.jpg'; // optional filename
      document.body.appendChild(a);
      a.click(); // ✅ this triggers the download
      document.body.removeChild(a);
    }

    //else check user subscription
    else {
      if (this.user.subscription_id == null || this.user.subscription_id == 0) {
        this.downloadWatermarked(this.imageData.id);

        // this.showPricingPopup();
      } else {
        // this.downloadFullResolution(this.imageData.id);
      }
    }
  }

  downloadWatermarked(imageId: number) {
    let url: string = this.imageData?.media_url ?? '';
    if (!url) {
      // Handle the case where url is not available
      alert('Image URL is not available.');
      return;
    }
    // Proceed with download logic here
    // Example: window.open(url, '_blank');
    url = url.replace('/thumbnails/', '/watermarked/').replace('thumb_', 'wm_');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'watermarked-image.jpg'; // optional, set filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
