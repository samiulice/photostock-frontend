import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginPayload } from '../../../core/interfaces/auth.interface';
import { Header } from '../../common/header/header';
import { ErrorHandlerService } from '../../../core/services/errorHandler/error-handler.service';
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
  redirectedRoute: string = '/profile';
  focusFragment: string = '';

  constructor(
    private auth: AuthService,
    private errorHandlerService: ErrorHandlerService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    const redirectTo = this.activatedRoute.snapshot.queryParamMap.get('redirectTo');
    const focusFragment = this.activatedRoute.snapshot.queryParamMap.get('fragment');
    console.log('User should be redirected to:', redirectTo);
    if (redirectTo) {
      this.redirectedRoute = redirectTo;
    } if (focusFragment) {
      this.focusFragment = focusFragment;
    }
  }
  login() {
    this.isLoading = true;
    console.log('redirect: ', this.redirectedRoute);
    this.auth.login(this.form.email, this.form.password).subscribe({
      next: (res) => {
        this.errorHandlerService.notifyUser(res.error, res.message, () => {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.auth.loginSuccess(res.token, this.redirectedRoute, this.focusFragment);
         
        })
      },
      error: (err) => {
        alert('Login error');
      },
    })
      .add(() => {
        this.isLoading = false
      })
  }
}
