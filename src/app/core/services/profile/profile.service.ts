import { Injectable } from '@angular/core';
import { IUserWithID } from '../../interfaces/user.interface';
import { ConstService } from '../constants/const.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  updateUserProfile(updatedUser: IUserWithID){
    return this.http.put<IUserWithID>(this.constant.url+'/auth/profile',updatedUser)
  }

  constructor(private constant: ConstService,private http:HttpClient,private router:Router, private auth : AuthService) { }
}
