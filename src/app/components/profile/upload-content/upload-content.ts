import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';

@Component({
  selector: 'app-upload-content',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './upload-content.html',
  styleUrl:'./upload-content.css'
})
export class UploadContent implements OnInit { 
  @ViewChild('uploadForm') uploadForm!: NgForm;
  
  ngOnInit(): void {
    //fetch available image categories from backend 
     this.uploadService.getCategories().subscribe({
    next: (res) => {
      this.categories = res;
    },
    error: (err) => {
      console.error('Failed to load categories', err);
    }
  });

 
  }
  categories: { id: number; name: string }[] = [];


  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  title: string = '';
  description:string="";
  license: string = "";
  category: string = "";

   resetForm(): void {
  this.uploadForm.resetForm(); // resets form values + validation
  this.previewUrl = null;
  this.selectedFile = null;
}


   constructor(private uploadService: UploadService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }

 onUpload(): void {
    this.uploadForm.control.markAllAsTouched();
  // Prevent upload if the form is invalid
  if (this.uploadForm.invalid || !this.selectedFile) {
    return;
  }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('category_id', this.category);
    formData.append('license_type', this.license);

    this.uploadService.uploadImage(formData).subscribe({
      next: (res) => {
        console.log('Upload success:', res);
        alert('Upload successful!');
        this.resetForm();
      },
      error: (err) => {
        console.error('Upload failed:', err);
        alert('Upload failed, please try again.');
      }
    });

    
  }
  
}


