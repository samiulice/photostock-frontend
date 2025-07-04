import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IAuth } from '../../../core/interfaces/auth.interface';
import { Header } from '../../common/header/header';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { IUserWithID } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  providers: [Header],
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css'],
})
export class UserProfile implements OnInit {
  header = inject(Header);
  public user!: IUserWithID;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u: IUserWithID= JSON.parse(storedUser);
      this.user = u;
      console.log("user:",this.user)
    }
  }

  editUser() {
    console.log(this.user);
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['/login'])
    this.auth.logoutSuccess();
  }

}
