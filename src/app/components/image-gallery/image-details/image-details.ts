import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ImageService } from "../../../core/services/image/image.service";
import { AuthService } from "../../../core/services/auth/auth.service";
import { ConstService } from "../../../core/services/constants/const.service";

export interface ImageData {
  id: string;
  url: string;
  description: string;
  isFree: boolean;
  accessLevel: 'free' | 'basic' | 'premium';
}

@Component({
  standalone: true,
  selector: 'app-image-detail',
  templateUrl: './image-details.html',
  styleUrls: ['./image-details.css'],
  imports: [CommonModule, RouterModule]
})
export class ImageDetails implements OnInit {
  image: ImageData | null = null;
  userSub: 'none' | 'basic' | 'premium' = 'none';
  hostURL:string = ""
  
  license_type:string = "free"

  constructor(
    private route: ActivatedRoute,
    private imageService: ImageService,
    private authService: AuthService,
    private constantService: ConstService
  ) {}

  ngOnInit() {

    this.hostURL = this.constantService.getHostURL()

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.imageService.getImageById(id).subscribe();
    }
    this.userSub = this.authService.getUserSubscription();
  }

  canDownload(): boolean {
    if (!this.image) return false;
    return (
      this.image.isFree ||
      this.userSub === 'premium' ||
      (this.userSub === 'basic' && this.image.accessLevel !== 'premium')
    );
  }

  downloadImage(watermarked: boolean = false) {
    const downloadUrl = watermarked
      ? this.image!.url + '?watermark=true'
      : this.image!.url;
    window.open(downloadUrl, '_blank');
  }
}
