import { Injectable } from '@angular/core';
import { IUserWithID, IUserWithResp } from '../../interfaces/user.interface';
import { ConstService } from '../constants/const.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IResp } from '../../interfaces/auth.interface';
import { IPlanListWithResp } from '../../interfaces/subscriptionPlan.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private baseURL!:string
  constructor(private constantService: ConstService,private http:HttpClient,private router:Router, private auth : AuthService) {
    this.baseURL = constantService.url
   }

  
  // Profile
  updateProfile(updatedUser: IUserWithID){
    return this.http.put<IResp>(this.baseURL+'/auth/profile',updatedUser)
  }
  updateProfileImage(formData: FormData){
    return this.http.put<IUserWithResp>(`${this.baseURL}/auth/profile/image`, formData);
  }

  


  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

}

