import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanService } from '../../../core/services/subscriptionPlan/subscription-plan.service';
import { Router } from '@angular/router';
import { IUserWithID } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-plan-cards',
  imports: [CommonModule],
  templateUrl: './plan-cards.html',
  styleUrl: './plan-cards.css'
})
export class PlanCards implements OnInit{
  user!:IUserWithID;
  
  constructor(private subscriptionPlan:SubscriptionPlanService,private router:Router){}
ngOnInit() {
  const u = localStorage.getItem('user');
  if (u) {
    this.user = JSON.parse(u);
    console.log(this.user); 
  }
}
buyPlan(id: number) {
  if(!this.user){
    this.router.navigate(['/login']);
    return;
  }
  else{
    if(this.user.subscription_id){
      alert('You already have a subscription');
      return
    }
  }

  this.subscriptionPlan.purchasePlan(id).subscribe({
    next: (res) => {
      if (res.error) {
        alert('Failed: ' + res.message);
        return;
      }
      alert('Success: Plan purchased!');
    },
    error: (err) => {
     
    }
  });
}


}
