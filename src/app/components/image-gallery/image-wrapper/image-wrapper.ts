import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageContainer } from '../image-container/image-container';
import { ImagesNav } from '../images-nav/images-nav';
import { IMediaCategory } from '../../../core/interfaces/content.interface';



@Component({
  selector: 'app-image-wrapper',
  standalone: true,
  imports: [CommonModule,ImageContainer,ImagesNav],
  templateUrl: './image-wrapper.html'
})
export class ImageWrapper {
  selectedCategory!: IMediaCategory

  onCategoryChange(category: IMediaCategory) {
    this.selectedCategory = category
  }
}
