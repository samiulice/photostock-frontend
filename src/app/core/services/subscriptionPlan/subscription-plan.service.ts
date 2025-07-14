import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  ISubscriptionPlanWithResp } from '../../interfaces/subscriptionPlan.interface';
import { ConstService } from '../constants/const.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  
  private baseURL!:string;

  constructor(private http:HttpClient, private constantService:ConstService) {
    this.baseURL=constantService.url
   }
  purchasePlan(id:number){
   return this.http.post<ISubscriptionPlanWithResp>(this.baseURL+'/plans/purchase?plan_id='+id, {})
  }

}
