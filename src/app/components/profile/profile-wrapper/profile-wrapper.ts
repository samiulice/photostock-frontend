import { Component } from '@angular/core';
import { UserProfile } from "../user-profile/user-profile";
import {  DownloadHistory } from "../download-history/download-history";
import { UploadHistory } from "../upload-history/upload-history";
import { UploadContent } from "../upload-content/upload-content";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-wrapper',
  imports: [UserProfile, UploadHistory,UploadContent, DownloadHistory,CommonModule],
  templateUrl: './profile-wrapper.html',
  styleUrl: './profile-wrapper.css'
})
export class ProfileWrapper {

  
   activeTab: string = 'profile';

  tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'upload', label: 'Upload' },
    { id: 'download', label: 'Download History' },
    { id: 'upload-history', label: 'Upload History' },
  ];
  uploadService: any;
  message: any;
  categories: any;

  selectTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
