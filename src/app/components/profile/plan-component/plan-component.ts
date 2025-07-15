import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { Plan } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-plan-component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './plan-component.html',
  styleUrl: './plan-component.css'
})
export class PlanComponent implements OnInit {
  showCreatePlan = false;
  plans: Plan[] = [];
  planForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      interval: ['monthly', Validators.required],
      category: ['', Validators.required],
      features: this.fb.array([this.fb.control('', Validators.required)]),
    });
    this.plans = [
    {
      id: "1",
      name: "Basic",
      price: 9.99,
      interval: "monthly",
      features: ["5 projects", "Basic support", "1GB storage"],
      category: "starter",
      status: "active",
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Pro",
      price: 29.99,
      interval: "monthly",
      features: ["Unlimited projects", "Priority support", "10GB storage", "Advanced analytics"],
      category: "professional",
      status: "active",
      createdDate: "2024-01-10",
    },
    {
      id: "3",
      name: "Enterprise",
      price: 99.99,
      interval: "monthly",
      features: ["Everything in Pro", "Custom integrations", "Dedicated support", "100GB storage"],
      category: "enterprise",
      status: "active",
      createdDate: "2024-01-05",
    },
  ]
  }
  get planFeatures(): FormArray {
    return this.planForm.get('features') as FormArray;
  }

  addFeature(): void {
    this.planFeatures.push(this.fb.control('', Validators.required));
  }

  removeFeature(index: number): void {
    if (this.planFeatures.length > 1) {
      this.planFeatures.removeAt(index);
    }
  }
createPlan(): void {
    if (this.planForm.valid) {
      const formValue = this.planForm.value;
      

      // this.profileService.addPlan(newPlan);
      this.resetPlanForm();
      this.showCreatePlan = false;
    }
  }
  resetPlanForm(): void {
    this.planForm.reset({
      name: '',
      price: 0,
      interval: 'monthly',
      category: '',
    });

    while (this.planFeatures.length > 1) {
      this.planFeatures.removeAt(1);
    }
    this.planFeatures.at(0).setValue('');
  }
  cancelPlanCreation(): void {
    this.showCreatePlan = false;
    this.resetPlanForm();
  }

}
