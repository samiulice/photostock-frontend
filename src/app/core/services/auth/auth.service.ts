import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload, IAuth } from '../../interfaces/auth.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://photostock-api-v1.onrender.com/api/v1/auth'; 
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  loginSuccess(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
    this.router.navigate(['/user/profile']);
  }
  logoutSuccess() {
    localStorage.removeItem('token');

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor(private http: HttpClient, private router: Router) {}

  register(data: RegisterPayload) {
    console.log("Registration Payload",data)
    return this.http.post<IAuth>(this.baseURL+"/register", data);

  }

  login(email: string, password: string) {
    return this.http.post<IAuth>(this.baseURL+"/login", {email, password});
    }
}
