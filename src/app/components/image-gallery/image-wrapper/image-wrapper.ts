import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageContainer } from '../image-container/image-container';
import { Images } from '../images/images';



@Component({
  selector: 'app-image-wrapper',
  standalone: true,
  imports: [CommonModule,ImageContainer,Images],
  templateUrl: './image-wrapper.html'
})
export class ImageWrapper {
  selectedCategory: string = 'All';

  onCategoryChange(category: string) {
    this.selectedCategory = category;
  }
}
