import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanService } from '../../../core/services/subscriptionPlan/subscription-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserWithID } from '../../../core/interfaces/user.interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-plan-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-cards.html',
  styleUrls: ['./plan-cards.css']
})
export class PlanCards implements OnInit {
  user: IUserWithID | null = null;

  constructor(
    private subscriptionPlanService: SubscriptionPlanService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

    
  ngOnInit(): void {
    const userData:string = localStorage.getItem('user') || "";
    if (userData) {
      try {
        this.user = JSON.parse(userData);
      } catch (e) {
        console.error('Failed to parse user data from localStorage:', e);
        this.user = null;
      }
    }

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0); // Wait for DOM to render
      }
    });
  }

  buyPlan(planId: number): void {
    if (!this.user) {
      this.router.navigate(['/login'],{
        queryParams: { redirectTo: '/', fragment: 'plans' },
      });
      return;
    }

    if (this.user.subscription_id) {
      alert('You already have a subscription.');
      return;
    }

    this.subscriptionPlanService.purchasePlan(planId).subscribe({
      next: (res) => {
        if (res.error) {
          alert('Failed: ' + res.message);
          return;
        }

        alert('Success: Plan purchased!');
        // Optionally reload user data or redirect
      },
      error: (err) => {
        console.error('Error purchasing plan:', err);
        alert('An unexpected error occurred. Please try again later.');
      }
    });
  }
}
