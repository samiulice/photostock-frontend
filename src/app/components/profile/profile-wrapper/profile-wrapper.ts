import { Component, OnInit } from '@angular/core';
import { DownloadHistory } from "../download-history/download-history";
import { UploadHistory } from "../upload-history/upload-history";
import { CommonModule } from '@angular/common';
import { Category } from "../category/category";
import { ProfileComponent } from "../profile-component/profile-component";
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { UploadImage } from "../upload-image/upload-image";
import { PlanComponent } from '../plan-component/plan-component';

@Component({
  selector: 'app-profile-wrapper',
  imports: [UploadHistory, DownloadHistory, CommonModule, Category, ProfileComponent, UploadImage, PlanComponent],
  templateUrl: './profile-wrapper.html',
  styleUrl: './profile-wrapper.css'
})
export class ProfileWrapper implements OnInit {

  tabs!: any[];
  user!: IUserWithID
  activeTab: string = 'profile';
  tab_header: string = "Profile Settings";
  tab_description: string = "Manage your personal Details";


  constructor(private router: Router) { }

  ngOnInit(): void {
    const u = localStorage.getItem('user');
    if (!u) {
      this.router.navigate(['/login'])
      return
    }
    this.user = JSON.parse(u)

    if (this.user.role == "user") {
      this.tabs = [
        {
          id: 'profile',
          label: 'Profile',
          icon: "person",
          class: "material-icons",
          header: "Profile Settings",
          description: "Manage your personal Details"
        },
        {
          id: 'upload-image',
          label: 'Upload Image',
          icon: "upload",
          class: "material-symbols-outlined",
          header: "Upload Image",
          description: "Upload your images to the platform"
        },
        {
          id: 'download-history',
          label: 'Download History',
          icon: "download",
          class: "material-icons",
          header: "Download History",
          description: "View and manage your downloaded items"
        },
        {
          id: 'upload-history',
          label: 'Upload History',
          icon: "upload",
          class: "material-symbols-outlined",
          header: "Upload History",
          description: "Track your uploaded images and files"
        },
      ];
    } else {
      this.tabs = [
        {
          id: 'profile',
          label: 'Profile',
          icon: "person",
          class: "material-icons",
          header: "Profile Settings",
          description: "Manage your personal Details"
        },
        {
          id: 'plans',
          label: 'Plans',
          icon: "crown",
          class: "material-symbols-outlined",
          header: "Subscription Plans",
          description: "Manage pricing and user subscription plans"
        },
        {
          id: 'categories',
          label: 'Categories',
          icon: "category",
          class: "material-icons",
          header: "Media Categories",
          description: "Create and manage image/video categories"
        },
        {
          id: 'download-history',
          label: 'Download History',
          icon: "download",
          class: "material-icons",
          header: "Download Activity",
          description: "Monitor download history of users"
        },
        {
          id: 'upload-history',
          label: 'Upload History',
          icon: "upload",
          class: "material-symbols-outlined",
          header: "Upload Activity",
          description: "View upload history and contributor media"
        },
      ];
    }
  }

  onTabChange(tab: any): void {
    this.activeTab = tab.id;
    this.tab_header = tab.header;
    this.tab_description = tab.description;
  }
}
