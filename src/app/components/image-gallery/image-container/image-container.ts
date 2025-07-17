import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IMedia,
  IMediaCategory,
} from '../../../core/interfaces/content.interface';
import { ContentService } from '../../../core/services/content/content.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-image-container',
  imports: [CommonModule,RouterLink],
  templateUrl: './image-container.html',
  styleUrl: './image-container.css',
})
export class ImageContainer implements OnInit {
  @Input() category!: IMediaCategory;
  constructor(private content: ContentService, private route: ActivatedRoute) {}
  images: IMedia[] = [];
  imageCount: number = 0;
  isLoading:boolean = true;
  ngOnInit(): void {
    //read query param for category id and name
    let id = 0;
    let name = "All"
    this.route.queryParams.subscribe((params) => {
      const i = params['id'];
      const n = params['name'];

      if(i && n){
        id = parseInt(i);
        name = n
      }
    });

    this.loadImagesByCategory(id, name);
  }
  ngOnChanges() {
    this.isLoading = true;
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
        if (res.medias != null) {
          this.imageCount = res.medias.length;
        }
        this.isLoading = false;
      },
    });
  }
}
