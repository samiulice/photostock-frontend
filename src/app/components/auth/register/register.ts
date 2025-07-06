import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { IAuth, RegisterPayload } from '../../../core/interfaces/auth.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../common/header/header';

@Component({
  selector: 'app-register',
  standalone: true,
  providers:[Header],
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  form: RegisterPayload & { confirmPassword: string } = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  message = '';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  register() {
    if(this.form.name.trim() == "" || this.form.email.trim() == "" || this.form.password==""){
      alert("Fill the form")
      return
    }
    if (this.form.password !== this.form.confirmPassword) {
      this.message = 'Passwords do not match.';
      alert(this.message);
      return;
    }

    this.isLoading = true;
    const { confirmPassword, ...payload } = this.form;

    this.auth.register(payload).subscribe({
      
      next: (res) => {
        console.log("Registration",res)
        if(res.error){
          this.message=res.message
          console.log(res.message);
          return
        }
        localStorage.setItem("user", JSON.stringify(res.user));
        this.auth.loginSuccess(res.token)
        console.log("User:",res.user)
        
      },
      error: (err: any) => {
        this.message = err.error?.message || 'Registration failed.';
      },
      complete: () => (this.isLoading = false),
    });
  }
}
