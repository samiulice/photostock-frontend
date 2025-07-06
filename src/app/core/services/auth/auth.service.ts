import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload, IAuth } from '../../interfaces/auth.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ConstService } from '../constants/const.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();
  constructor(private http: HttpClient, private router: Router, private constant: ConstService) {
    this.baseURL = this.constant.url + '/auth';
  }


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

  register(data: RegisterPayload) {
    console.log("Registration Payload", data)
    return this.http.post<IAuth>(this.baseURL + "/register", data);

  }

  login(email: string, password: string) {
    return this.http.post<IAuth>(this.baseURL + "/login", { email, password });
  }
}
