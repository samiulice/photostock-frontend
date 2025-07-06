import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { IMediaCategory } from '../../../core/interfaces/content.interface';





@Component({
  selector: 'app-images',
  imports:[CommonModule,FormsModule],
  templateUrl: './images.html',
  styleUrls: ['./images.css']
})


export class Images implements OnInit {
  cartItemCount: number = 0;
  isSearchOpen: boolean = false;
  selectedCategory: string='All';
  selectedCategoryId: number=0;
  isScrolled: boolean = false;
  categories: IMediaCategory[] = [];

  

  // @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;

  message: any;

    constructor(private uploadService: UploadService) {}

    @Output() categoryChange = new EventEmitter<string>();



  ngOnInit(): void {
    //fetch available image categories from backend
    this.uploadService.getCategories().subscribe({
      next: (res: { error: any; message: any; media_categories: IMediaCategory[]; }) => {
        console.log('category response',res)
        if (res.error) {
          this.message = res.message;
          return;
        }
        this.categories = res.media_categories;
      },
      error: (err: any) => {
        console.error('Failed to load categories', err);
      },
    });
  }

  onCategorySelect(category_id: number, category:string): void {
    this.selectedCategoryId = category_id;
    this.selectedCategory = category;
    this.categoryChange.emit(category);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }


  

  // toggleSearch(): void {
  //   this.isSearchOpen = !this.isSearchOpen;
  //   if (this.isSearchOpen) {
  //     setTimeout(() => {
  //       this.searchInputRef?.nativeElement.focus();
  //     }, 0);
  //   }
  // }

  

  // onCartClick(): void {
  //   console.log('Cart clicked!');
  // }

  // handleKeyPress(event: KeyboardEvent): void {
  //   if (event.key === 'Escape') {
  //     this.clearSearch();
  //   }
  // }
}
