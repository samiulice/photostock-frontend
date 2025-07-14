import { Component, OnInit } from '@angular/core';
import { DownloadHistory } from "../download-history/download-history";
import { UploadHistory } from "../upload-history/upload-history";
import { CommonModule } from '@angular/common';
import { Plan } from "../plan/plan";
import { Category } from "../category/category";
import { ProfileComponent } from "../profile-component/profile-component";
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { UploadImage } from "../upload-image/upload-image";

@Component({
  selector: 'app-profile-wrapper',
  imports: [UploadHistory, DownloadHistory, CommonModule, Plan, Category, ProfileComponent, UploadImage],
  templateUrl: './profile-wrapper.html',
  styleUrl: './profile-wrapper.css'
})
export class ProfileWrapper implements OnInit {

  tabs!: any[];
  user!: IUserWithID
  activeTab: string = 'profile';

  constructor(private router: Router) { }

  ngOnInit(): void {
    const u = localStorage.getItem('user');
    if (!u) {
      this.router.navigate(['/login'])
      return
    }
    this.user = JSON.parse(u)

    //define tabs
    if (this.user.role == "user") {
      this.tabs = [
        { id: 'profile', label: 'Profile' , icon:"person", class:"material-icons" },
        { id: 'upload-image', label: 'Upload Image'  , icon:"upload",class:"material-symbols-outlined" },
        { id: 'download-history', label: 'Download History'  , icon:"download",class:"material-icons" },
        { id: 'upload-history', label: 'Upload History'  , icon:"upload",class:"material-symbols-outlined" },
      ];
    }else {
      this.tabs = [
        { id: 'profile', label: 'Profile', icon:"person" ,class:"material-icons" },
        { id: 'plans', label: 'Plans' , icon:"crown" ,class:"material-symbols-outlined" },
        { id: 'categories', label: 'Categories' , icon:"category" ,class:"material-icons" },
        { id: 'download-history', label: 'Download History' , icon:"download",class:"material-icons" },
        { id: 'upload-history', label: 'Upload History' , icon:"upload" ,class:"material-symbols-outlined" },
      ];
    }
  }

  uploadService: any;
  message: any;
  categories: any;

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }
}
