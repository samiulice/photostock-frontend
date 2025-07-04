import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})
export class Carousel implements OnInit {
  slides = [

    {
      image: 'assets/banner-images/headphone.png',
      title: 'Best Headphones Deal',
      subtitle: 'Wireless comfort',
    },
    {
      image: 'assets/banner-images/tv.png',
      title: 'Smart TV For Your Family',
      subtitle: 'Big screen, big moments',
    },
    {
      image: 'assets/banner-images/im1.jpeg',
      title: 'Rose flower',
      subtitle: 'High Quality',
    },
    {
      image: 'assets/banner-images/img2.jpeg',
      title: 'Rose flower',
      subtitle: 'High Quality',
    },
    {
      image: 'assets/banner-images/im3.jpeg',
      title: 'Rose flower',
      subtitle: 'High Quality',
    },
  ];

  currentIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // show each slide for 5 seconds
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}
