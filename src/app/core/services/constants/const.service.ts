import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {
  // private _backendURL: string = 'https://photostock-api-v1.onrender.com/api/v1';
  private _hostURL: string = 'http://localhost:8080';
  private _backendURL: string = this._hostURL +'/api/v1';

  get url(): string {
    return this._backendURL;
  }
  getHostURL():string{
    return this._hostURL
  }
}
