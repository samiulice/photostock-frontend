import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginPayload } from '../../../core/interfaces/auth.interface';
import { Header } from '../../common/header/header';
@Component({
  selector: 'app-login',
  standalone: true,
  providers:[Header],
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
 private header = inject(Header)
  form: LoginPayload = {
    email: '',
    password: '',
  };

  isLoading = false;
  message = '';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  login() {
    this.auth.login(this.form.email, this.form.password).subscribe({
      next: (res) => {
        if (res.error) {
          alert('Login failed: Invalid credentials');
          return;
        } else {
          localStorage.setItem('user', JSON.stringify(res.user));
         this.auth.loginSuccess(res.token);
        
        }
      },
      error: (err) => {
        alert('Login error');
      },
    });
  }
}
