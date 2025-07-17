import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { ElementRef, HostListener, ViewChild } from '@angular/core';
import { ConstService } from '../../../core/services/constants/const.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  public isLoggedIn: boolean = false;
  public user!: IUserWithID;
  dropdownOpen = false;
  hostURL:string = ""
  @ViewChild('dropdownWrapper') dropdownWrapper!: ElementRef;


  constructor(private auth: AuthService, private constService:ConstService) { }
  ngOnInit(): void {
    this.hostURL = this.constService.getHostURL()
    this.auth.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if(this.isLoggedIn){
        const user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');
        this.user = user
      }
    });
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.dropdownWrapper) return;
    const clickedInside = this.dropdownWrapper.nativeElement.contains(
      event.target
    );

    if (!clickedInside) {
      this.dropdownOpen = false;
    }
  }

  getUserName() {
    if (this.auth.hasToken()) {
      //DEV
      let user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');

      const name = user.name || ''; // or this.user.fullName etc.

      return name;
    }
    return 'Dashboard';
  }
  getUserEmail() {
    if (this.auth.hasToken()) {
      //DEV
      let user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');

      const email = user.email || ''; // or this.user.fullName etc.

      return email;
    }
    return 'Dashboard';
  }

  getAvatarURL() {
    if (this.auth.hasToken()) {
      //DEV
      let user: IUserWithID = JSON.parse(localStorage.getItem('user') || '');
      if (user.avatar_url == '') {
        user.avatar_url = '/images/user.png';
      }
      return user.avatar_url;
    }
    return '';
  }
  logout() {
    this.auth.logoutSuccess();
  }
  
}
