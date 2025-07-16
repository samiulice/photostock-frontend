import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IPlan, IPlanWithID } from '../../../core/interfaces/subscriptionPlan.interface';
import { SubscriptionPlanService } from '../../../core/services/subscriptionPlan/subscription-plan.service';

@Component({
  selector: 'app-plan-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './plan-component.html',
  styleUrl: './plan-component.css'
})
export class PlanComponent implements OnInit {
  showCreatePlan = false;
  plans: IPlanWithID[] = [];
  planForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planService: SubscriptionPlanService
  ) {}

  ngOnInit(): void {
    this.planForm = this.fb.group({
      Title: ['', Validators.required],
      Price: [0, [Validators.required, Validators.min(0.01)]],
      DownloadLimit: [0, [Validators.required, Validators.min(1)]],
      ExpiresAt: [30, [Validators.required, Validators.min(1)]], // assuming days
      Status: [true, Validators.required],
      Terms: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });

    this.planService.plansList.subscribe((res) => {
      if (res.error) {
        alert(res.message);
        return;
      }
      console.log("initial: ", res)
      this.plans = res.plans;
      console.log("initial: ", this.plans)
    });
  }

  get planTerms(): FormArray {
    return this.planForm.get('Terms') as FormArray;
  }

  addFeature(): void {
    this.planTerms.push(this.fb.control('', Validators.required));
  }

  removeFeature(index: number): void {
    if (this.planTerms.length > 1) {
      this.planTerms.removeAt(index);
    }
  }

  createPlan(): void {
    if (this.planForm.valid) {
      const formValue = this.planForm.value;

      const newPlan: IPlan = {
        Title: formValue.Title,
        Terms: formValue.Terms,
        Status: formValue.Status,
        Price: Number(formValue.Price),
        DownloadLimit: Number(formValue.DownloadLimit),
        ExpiresAt: Number(formValue.ExpiresAt),
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      };

      console.log('Creating plan:', newPlan);

      // connect to backend
      this.planService.addPlan(newPlan).subscribe((res)=>{
        if (res.error){
          alert(res.message);
          return;
        }
        this.plans.push(res.plan)
      });

      this.resetPlanForm();
      this.showCreatePlan = false;
    }
  }

  resetPlanForm(): void {
    this.planForm.reset({
      Title: '',
      Price: 0,
      DownloadLimit: 0,
      ExpiresAt: 30,
      Status: true,
    });

    while (this.planTerms.length > 1) {
      this.planTerms.removeAt(1);
    }

    this.planTerms.at(0).setValue('');
  }

  cancelPlanCreation(): void {
    this.showCreatePlan = false;
    this.resetPlanForm();
  }
}
