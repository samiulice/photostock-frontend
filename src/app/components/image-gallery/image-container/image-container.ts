import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IMedia,
  IMediaCategory,
} from '../../../core/interfaces/content.interface';
import { ContentService } from '../../../core/services/content/content.service';

@Component({
  selector: 'app-image-container',
  imports: [CommonModule],
  templateUrl: './image-container.html',
  styleUrl: './image-container.css',
})
export class ImageContainer implements OnInit {
  @Input() category!: IMediaCategory;
  constructor(private content: ContentService) {}
  images: IMedia[] = [];
  imageCount: number = 0;
  ngOnInit(): void {
    this.loadImagesByCategory(0, 'All');
  }
  ngOnChanges() {
    console.log(this.category.id, this.category.name);
    this.loadImagesByCategory(this.category.id, this.category.name);
  }

  loadImagesByCategory(category_id: number, category: string) {
    this.content.getThumbnails(category_id).subscribe({
      next: (res) => {
        console.log('media resp: ', res);
        if (res.error) {
          alert(res.message);
          return;
        }
        this.images = res.medias;
        if (res.medias == null || res.medias.length == 0) {
          this.imageCount = 0;
        } else {
          this.imageCount = this.images.length;
        }
      },
    });
  }
}
