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
  isLoading: boolean = true;
  isUploading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private planService: SubscriptionPlanService
  ) { }

  ngOnInit(): void {
    this.planForm = this.fb.group({
      Title: ['', Validators.required],
      Price: [0, [Validators.required]],
      DownloadLimit: [0, [Validators.required]],
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
      if (res.plans && res.plans.length != 0) {

        this.plans = res.plans;
      }
      console.log("initial: ", this.plans)
      this.isLoading = false;
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
  getStatusBadgeClass(status: boolean): string {
    return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  getStatusColor(status: boolean): string {
    return status ? 'status-active' : 'status-cancelled';
  }

  getIntervalText(days: number): string {
    switch (days) {
      case 7:
        return 'week';
      case 30:
        return 'month';
      case 365:
        return 'year';
      default:
        return `${days} days`;
    }
  }


  createPlan(): void {
    
    if (this.planForm.valid) {
      this.isUploading = true;
      const formValue = this.planForm.value;

      const newPlan: IPlan = {
        title: formValue.Title,
        terms: formValue.Terms,
        concat_terms: '',
        status: formValue.Status,
        price: Number(formValue.Price),
        download_limit: Number(formValue.DownloadLimit),
        expires_at: Number(formValue.ExpiresAt),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Creating plan:', newPlan);

      // connect to backend
      this.planService.addPlan(newPlan).subscribe((res) => {
        if (res.error) {
          alert(res.message);
          this.isUploading = false;
          return;
        }
        this.plans.push(res.plan)
        this.isUploading = false;
      });

      this.resetPlanForm();
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
