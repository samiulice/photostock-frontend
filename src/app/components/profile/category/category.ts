import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { IMediaCategory } from '../../../core/interfaces/content.interface';
import { ContentService } from '../../../core/services/content/content.service';
import { ErrorHandlerService } from '../../../core/services/errorHandler/error-handler.service';

@Component({
  selector: 'app-category',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit{
  categoryForm!: FormGroup;
  showCreateCategory: boolean = false;
  imagePreview: string | null = null;
  imageFile: File | null = null;
  showCreatePlan: boolean = false;
  message!: string;
  isLoading:boolean = true;
  isUploading:boolean = false;
  categories!: IMediaCategory[];

  constructor(private uploadService:UploadService,private contentService:ContentService, private fb: FormBuilder, private errorHandlerService:ErrorHandlerService){}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name:['', Validators.required],
      image:['']
    })
    this.uploadService.getCategories().subscribe({
      next: (res) => {
        console.log('category response', res);
        if (res.error) {
          this.message = res.message;
          return;
        }

        this.categories = res.media_categories;
        console.log(this.categories)
        this.isLoading =false;
      },

      error: (err) => {
        console.error('Failed to load categories', err);
      },
    });


  }
  createCategory(): void {
    this.isUploading = true
  if (this.categoryForm.valid && this.imageFile) {
    const formValue = this.categoryForm.value;
    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('image', this.imageFile);

    this.contentService.createCategory(formData).subscribe((res) => {
      this.errorHandlerService.notifyUser(res.error, res.message, () => {
        this.isUploading = false;
        this.categories.push(res.media_category);
        alert('Category added successfully');
      });
    });

    this.resetCategoryForm();
  } else {
    alert('Please fill all required fields and upload an image.');
  }
}


  resetCategoryForm(): void {
    this.categoryForm.reset();
    this.imagePreview = null;
    this.imageFile = null;
  }

 onImageUpload(event: Event): void {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    this.imageFile = file; // store the file for FormData
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string; // For image display
    };
    reader.readAsDataURL(file);
  }
}

  removeImage(): void {
    this.imagePreview = null;
    this.imageFile = null;
  }

  cancelCategoryCreation(): void {
    this.showCreateCategory = false;
    this.resetCategoryForm();
  }
}
