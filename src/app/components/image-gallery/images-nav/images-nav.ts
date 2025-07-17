import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { IMediaCategory } from '../../../core/interfaces/content.interface';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-images-nav',
  imports:[CommonModule,FormsModule],
  templateUrl: './images-nav.html',
  styleUrls: ['./images-nav.css']
})


export class ImagesNav implements OnInit {
  cartItemCount: number = 0;
  isSearchOpen: boolean = false;
  selectedCategory: string='All';
  isScrolled: boolean = false;
  categories: IMediaCategory[] = [];

  message: any;

    constructor(private uploadService: UploadService, private route:ActivatedRoute) {}

    @Output() categoryChange = new EventEmitter<IMediaCategory>();



  ngOnInit(): void {
    

    //fetch available image categories from backend
    this.uploadService.getCategories(true).subscribe({
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

    //read query param for category id and name
    let id = 0;
    let name = "All"
    this.route.queryParams.subscribe((params) => {
      const i = params['id'];
      const n = params['name'];

      if(i && n){
        id = parseInt(i);
        name = n
        this.selectedCategory = name
      }
    });

    console.log("Query: ", id, name)
  }

  onCategorySelect(category:IMediaCategory): void {
    this.selectedCategory = category.name;
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
