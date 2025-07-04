import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUserWithID } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  public isLoggedIn: boolean = false;
  
  getUserName(){
    if(this.auth.hasToken()){
      //DEV
      const user:IUserWithID = JSON.parse(localStorage.getItem("user")||"")
      return user.name
    }
    return "Dashboard"
  }
  
  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(status=>{
      this.isLoggedIn=status;
    });

  }
  constructor(private router:Router,private auth:AuthService){}
 
  
 
}
