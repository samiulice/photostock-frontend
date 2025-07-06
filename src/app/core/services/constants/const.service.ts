import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {
  private _backendURL: string = 'https://photostock-api-v1.onrender.com/api/v1';
  // private _backendURL: string = 'http://localhost:8080/api/v1';

  get url(): string {
    return this._backendURL;
  }
}
