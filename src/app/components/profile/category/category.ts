import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { IMediaCategory } from '../../../core/interfaces/content.interface';

@Component({
  selector: 'app-category',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category implements OnInit{
  categoryForm!: FormGroup;
  showCreateCategory: boolean = false;
  imagePreview: string | undefined;
  showCreatePlan: boolean = false;
  message!: string;
  isLoading:boolean = true;
  categories!: IMediaCategory[];

  constructor(private uploadService:UploadService){}
  ngOnInit(): void {
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
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      // const newCategory: IMediaCategory = {
      //   id: Date.now().toString(),
      //   name: formValue.name,
      //   description: formValue.description,
      //   // image: formValue.image || '/images/upload-image.jpg',
      //   // planCount: 0,
      //   createdDate: new Date().toISOString().split('T')[0],
      // };

      // this.profileService.addCategory(newCategory);
      this.resetCategoryForm();
      this.showCreateCategory = false;
    }
  }

  resetCategoryForm(): void {
    this.categoryForm.reset();
    this.imagePreview = '';
  }

  onImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.imagePreview = result;
        this.categoryForm.patchValue({ image: result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = '';
    this.categoryForm.patchValue({ image: '' });
  }

  cancelPlanCreation(): void {
    this.showCreatePlan = false;
    this.resetPlanForm();
  }
  resetPlanForm() {
    throw new Error('Method not implemented.');
  }

  cancelCategoryCreation(): void {
    this.showCreateCategory = false;
    this.resetCategoryForm();
  }
}
