import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent implements OnInit {

  isEditing = false;
  user!: IUserWithID;
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u: IUserWithID = JSON.parse(storedUser);
      this.user = u;
      console.log('user:', this.user);
    }

    this.isEditing = false;
    //initialize form

    this.profileForm = this.fb.group({
      name: [{ value: this.user.name, disabled: true }, Validators.required],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: this.user.mobile, disabled: true }],
      location: [{ value: this.user.address, disabled: true }],
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

  saveProfile(): void {
    if (this.profileForm.valid) {
      // Save form values into user object
      this.user = { ...this.user, ...this.profileForm.value };

      // Save updated user to localStorage (optional)
      localStorage.setItem('user', JSON.stringify(this.user));

      // Disable form again
      this.isEditing = false;

      // Optional: update the form with saved values
      this.profileForm.patchValue(this.user);
    }
  }
}
