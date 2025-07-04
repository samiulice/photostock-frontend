import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-cards',
  imports: [CommonModule],
  templateUrl: './plan-cards.html',
  styleUrl: './plan-cards.css'
})
export class PlanCards {
   plans = [
    {
      name: 'Basic',
      price: '$5/month',
      features: ['5 images/day', 'Standard support']
    },
    {
      name: 'Standard',
      price: '$10/month',
      features: ['15 images/day', 'Priority support']
    },
    {
      name: 'Premium',
      price: '$20/month',
      features: ['Unlimited images', 'Premium support', 'Early access']
    }
  ];

}
