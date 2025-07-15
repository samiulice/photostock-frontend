import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../core/services/profile/profile.service';

@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent implements OnInit {

  isEditing = false;
  isPhotoChange = false;
  user!: IUserWithID;
  profileForm!: FormGroup;
  imagePreview = '';
  selectedFile: File | null = null

  constructor(private fb: FormBuilder, private profileService: ProfileService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u: IUserWithID = JSON.parse(storedUser);
      this.user = u;
      console.log('user:', this.user);
    }

    this.isEditing = false;
    this.isPhotoChange = false;
    //initialize form

    this.profileForm = this.fb.group({
      name: [{ value: this.user.name, disabled: true }, Validators.required],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      mobile: [{ value: this.user.mobile, disabled: true }],
      address: [{ value: this.user.address, disabled: true }],
    });

  }


  toggleEdit(): void {
    if (this.isEditing) {
      // User clicked "Save"
      this.saveProfile();
    } else {
      // User clicked "Edit"
      this.isEditing = true;
      this.profileForm.enable();

    }
  }
  togglePhotoPreview(): void {
    if (this.isPhotoChange) {

    } else {
      this.isPhotoChange = true
    }
  }

  onImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.selectedFile = file;
      // Optional: preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  saveImage(): void {
    if (!this.selectedFile) {
      alert("No file selected.");
      return;
    }



    const formData = new FormData();
    formData.append('image', this.selectedFile);  // Append raw file (not base64)

    console.log('Uploading image...');

    this.profileService.updateProfileImage(formData).subscribe({
      next: (res) => {
        if (res.error) {
          alert(res.message);
          return;
        }
        console.log('Upload successful:', res);
        localStorage.setItem('user', JSON.stringify(res.user))
        this.user = res.user
        location.reload()
      },
      error: (err) => {
        console.error('Upload failed:', err);
      }
    });

  }


  cancelUpload(): void {
    this.imagePreview = '';
    this.isPhotoChange = false;
  }
  saveProfile(): void {
    if (this.profileForm.valid) {
      // Save form values into user object
      console.log(this.profileForm.value)
      this.user = { ...this.user, ...this.profileForm.value };

      // Disable form again
      this.isEditing = false;

      //submit the form
      this.profileService.updateProfile(this.user).subscribe((res) => {
        if (res.error) {
          alert(res.message)
          return
        }
        //update localstorage item
        localStorage.setItem('user', JSON.stringify(this.user))
      })
    }
  }
}
