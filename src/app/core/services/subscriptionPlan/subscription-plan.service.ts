import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstService } from '../constants/const.service';
import { Observable } from 'rxjs';
import { IPlan, IPlanListWithResp, IPlanWithResp } from '../../interfaces/subscriptionPlan.interface';
import { IResp } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {

  private baseURL!: string;

  constructor(private http: HttpClient, private constantService: ConstService) {
    this.baseURL = constantService.url
  }
  // Plans
  get plansList(): Observable<IPlanListWithResp> {
    return this.http.get<IPlanListWithResp>(this.baseURL + "/plans")
  }

  addPlan(plan:IPlan){
    return this.http.post<IPlanWithResp>(this.baseURL + "/plans", plan)
  }
  purchasePlan(id: number) {
    return this.http.post<IResp>(this.baseURL + '/plans/purchase?plan_id=' + id, {})
  }

}
