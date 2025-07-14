import { Component, NgModule, type OnInit } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  type FormArray,
  Validators,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { Inject } from '@angular/core';
import { ProfileService } from '../../../core/services/profile/profile.service';
import type {
  Plan,
  Subscription,
  PaymentHistory,
  UploadHistory,
  DownloadHistory,
  UserProfile,
} from '../../../core/interfaces/admin.interface';

import { CommonModule } from '@angular/common';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { IMediaCategory } from '../../../core/interfaces/content.interface';
import { IUserWithID } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-profile.html',
  styleUrls: ['./admin-profile.css'],
})
export class AdminProfile implements OnInit {
  activeTab = 'profile';
  isEditing = false;
  showCreatePlan = false;
  showCreateCategory = false;
  imagePreview = '';


  subscription: Subscription = {
    plan: 'Pro',
    status: 'active',
    nextBilling: '2024-02-15',
    price: 29.99,
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      'Custom integrations',
      'Team collaboration',
    ],
  };

  plans: Plan[] = [];
  categories: IMediaCategory[] = [];
  paymentHistory: PaymentHistory[] = [];
  uploadHistory: UploadHistory[] = [];
  downloadHistory: DownloadHistory[] = [];
  public user!: IUserWithID;

  profileForm!: FormGroup;
  planForm!: FormGroup;
  categoryForm!: FormGroup;
  message: any;
  baseURL: any;
  constant: any;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u: IUserWithID = JSON.parse(storedUser);
      this.user = u;
      console.log('user:', this.user);
    }

     this.initializeForms();
    this.loadData();
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.mobile],
      location: [this.user.address],
    });

    this.planForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      interval: ['monthly', Validators.required],
      category: ['', Validators.required],
      features: this.fb.array([this.fb.control('', Validators.required)]),
    });

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
    });
  }

  loadData(): void {
    this.profileService.plans$.subscribe((plans) => {
      this.plans = plans;
    });

    this.uploadService.getCategories().subscribe({
      next: (res) => {
        console.log('category response', res);
        if (res.error) {
          this.message = res.message;
          return;
        }

        this.categories = res.media_categories;
        this.baseURL = this.constant.getHostURL();
      },

      error: (err) => {
        console.error('Failed to load categories', err);
      },
    });
    this.profileService.paymentHistory$.subscribe(
      (history: PaymentHistory[]) => {
        this.paymentHistory = history;
      }
    );

    this.profileService.uploadHistory$.subscribe((history: UploadHistory[]) => {
      this.uploadHistory = history;
    });

    this.profileService.downloadHistory$.subscribe(
      (history: DownloadHistory[]) => {
        this.downloadHistory = history;
      }
    );
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

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

toggleEdit(): void {
  if (this.isEditing) {
    // User clicked "Save"
    this.saveProfile();
  } else {
    // User clicked "Edit"
    this.isEditing = true;
  }
}

saveProfile(): void {
  if (this.profileForm.valid) {
    // Save form values into user object
    this.user = { ...this.user, ...this.profileForm.value };

    // Save updated user to localStorage (optional)
    localStorage.setItem('user', JSON.stringify(this.user));

    // Disable form again
    this.isEditing = false;

    // Optional: update the form with saved values
    this.profileForm.patchValue(this.user);
  }
}


  createPlan(): void {
    if (this.planForm.valid) {
      const formValue = this.planForm.value;
      const newPlan: Plan = {
        id: Date.now().toString(),
        name: formValue.name,
        price: formValue.price,
        interval: formValue.interval,
        features: formValue.features.filter((f: string) => f.trim() !== ''),
        category: formValue.category,
        status: 'active',
        createdDate: new Date().toISOString().split('T')[0],
      };

      this.profileService.addPlan(newPlan);
      this.resetPlanForm();
      this.showCreatePlan = false;
    }
  }

  createCategory(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      // const newCategory: IMediaCategory = {
      //   id: Date.now().toString(),
      //   name: formValue.name,
      //   description: formValue.description,
      //   // image: formValue.image || '/images/upload-image.jpg',
      //   // planCount: 0,
      //   createdDate: new Date().toISOString().split('T')[0],
      // };

      // this.profileService.addCategory(newCategory);
      this.resetCategoryForm();
      this.showCreateCategory = false;
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

  resetCategoryForm(): void {
    this.categoryForm.reset();
    this.imagePreview = '';
  }

  onImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.imagePreview = result;
        this.categoryForm.patchValue({ image: result });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = '';
    this.categoryForm.patchValue({ image: '' });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
      case 'completed':
        return 'status-active';
      case 'cancelled':
      case 'failed':
        return 'status-cancelled';
      case 'expired':
      case 'pending':
      case 'processing':
        return 'status-pending';
      default:
        return 'status-default';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'expired':
      case 'pending':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatFileSize(bytes: number): string {
    return this.profileService.formatFileSize(bytes);
  }

  cancelPlanCreation(): void {
    this.showCreatePlan = false;
    this.resetPlanForm();
  }

  cancelCategoryCreation(): void {
    this.showCreateCategory = false;
    this.resetCategoryForm();
  }

  downloadInvoice(invoiceUrl: string): void {
    // Implement download logic
    console.log('Downloading invoice:', invoiceUrl);
  }

  downloadFile(fileName: string): void {
    // Implement file download logic
    console.log('Downloading file:', fileName);
  }

  getTabLabel(tab: string): string {
    switch (tab) {
      case 'profile':
        return 'Profile';
      case 'subscription':
        return 'Plans';
      case 'categories':
        return 'Categories';
      case 'payment-history':
        return 'Payments';
      case 'upload-history':
        return 'Uploads';
      case 'download-history':
        return 'Downloads';
      default:
        return tab;
    }
  }
}
