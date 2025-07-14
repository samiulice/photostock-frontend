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
export class Header implements OnInit {
  public isLoggedIn: boolean = false;
  public user!: IUserWithID;

  getUserName() {
    if (this.auth.hasToken()) {
      //DEV
      let user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');

      const name = user.name || ''; // or this.user.fullName etc.

      const words = name.trim().split(' ');
      console.log('splitted ', JSON.stringify(words));

      if (words.length === 0) return '';
      if (words.length === 1) return words[0][0].toUpperCase();

      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return 'Dashboard';
  }

  getAvatarURL() {
    if (this.auth.hasToken()) {
      //DEV
      let user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');
      if(user.avatar_url == ""){
        user.avatar_url = "/images/user.png"
      }
      return user.avatar_url
    }
    return '';
  }

  ngOnInit(): void {
    const user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');
    this.auth.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  constructor(private router: Router, private auth: AuthService) {}
}
