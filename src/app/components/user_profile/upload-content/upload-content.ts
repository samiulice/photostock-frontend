import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import {
  IMediaCategory,
} from '../../../core/interfaces/content.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-upload-content',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './upload-content.html',
  styleUrl: './upload-content.css',
})
export class UploadContent implements OnInit {
  isLoading=false;
  @ViewChild('uploadForm') uploadForm!: NgForm;
  message = '';

  categories: IMediaCategory[] = [];

  ngOnInit(): void {
    //fetch available image categories from backend
    this.uploadService.getCategories().subscribe({
      next: (res) => {
        console.log('category response',res)
        if (res.error) {
          this.message = res.message;
          return;
        }
        this.categories = res.media_categories;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      },
    });
  }

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  title: string = '';
  description: string = '';
  license: string = '';
  category: string = '';

  resetForm(): void {
    this.uploadForm.resetForm(); // resets form values + validation
    this.previewUrl = null;
    this.selectedFile = null;
  }

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any): void {
  const file = event.target.files[0];

  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];

  if (file) {
    const fileTypeValid = allowedTypes.includes(file.type);
    const fileExtensionValid = allowedExtensions.some(ext =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (fileTypeValid && fileExtensionValid) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    } else {
      // Alert user using popup
      Swal.fire({
        icon:'warning',
        title:'Oops...',
        text:'Only image files (JPG, JPEG, PNG) are supported',
       customClass:{
        popup:'custom-swal-size'
       }
      });
      this.selectedFile = null;
      this.previewUrl = null;
      event.target.value = ''; // Clear the file input
    }
  }
}


  onUpload(): void {
    this.uploadForm.control.markAllAsTouched();
    // Prevent upload if the form is invalid
    if (this.uploadForm.invalid || !this.selectedFile) {
      return;
    }
 this.isLoading=true;
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('media_title', this.title);
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
      },
      complete:()=>(this.isLoading=false),
    });
  }
}
