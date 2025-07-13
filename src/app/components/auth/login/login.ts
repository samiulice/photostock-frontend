import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginPayload } from '../../../core/interfaces/auth.interface';
import { Header } from '../../common/header/header';
@Component({
  selector: 'app-login',
  standalone: true,
  providers: [Header],
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {
  private header = inject(Header);
  form: LoginPayload = {
    email: '',
    password: '',
  };

  isLoading = false;
  message = '';
  redirectedRoute: string = '/profile/user';

  constructor(
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    const redirectTo =
      this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
      console.log('User should be redirected to:', redirectTo);
      if(redirectTo){
        this.redirectedRoute = redirectTo;
      }
  }
  login() {
    console.log('redirect: ', this.redirectedRoute);
    this.auth.login(this.form.email, this.form.password).subscribe({
      next: (res) => {
        if (res.error) {
          this.message = res.message;
          return;
        } else {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.auth.loginSuccess(res.token, this.redirectedRoute);
        }
      },
      error: (err) => {
        alert('Login error');
      },
    });
  }
}
