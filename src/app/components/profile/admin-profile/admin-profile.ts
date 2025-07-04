import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-profile',
  imports: [CommonModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile {
   admin = {
    name: 'Admin Name',
    email: 'admin@example.com',
    phone: '+8801234567891',
    role: 'Super Admin',
    permissions: ['Manage Users', 'Access Reports', 'Control Subscriptions'],
    totalUsers: 145
  };

}
