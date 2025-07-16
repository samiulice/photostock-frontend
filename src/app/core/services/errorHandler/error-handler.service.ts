import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  notifyUser(err:boolean, message:string, callback:any){
    if (err){
      console.log("Error: ", message)
      alert(message)
    } else {
      callback()
    }
  }
}
