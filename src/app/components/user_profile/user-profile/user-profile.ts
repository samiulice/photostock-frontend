import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IAuth } from '../../../core/interfaces/auth.interface';
import { Header } from '../../common/header/header';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { ProfileService } from '../../../core/services/profile/profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  providers: [Header],
  imports: [CommonModule, RouterModule, MatIconModule,FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class UserProfile implements OnInit {
  header = inject(Header);
  public user!: IUserWithID;
  isEditing=false;
  originalUserData!:IUserWithID;

  constructor(private router: Router, private auth: AuthService,private update:ProfileService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u: IUserWithID= JSON.parse(storedUser);
      this.user = u;
      console.log("user:",this.user)
    }
  }

  editUser() {
    this.isEditing=true;
    this.originalUserData=this.user;
  }
saveChanges() {
  this.update.updateUserProfile(this.user).subscribe({
    next: (res) => {
      // Update local data and UI
      this.originalUserData = this.user;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.isEditing = false;
      console.log('User updated successfully!');
    },
    error: (err) => {
      console.error('Failed to update user:', err);
    }
  });
}


  logout() {
    localStorage.clear();
    // this.router.navigate(['/login'])
    this.auth.logoutSuccess();
  }
  cancelEdit() {
  this.isEditing = false;
  this.user = JSON.parse(JSON.stringify(this.originalUserData));
}


}
