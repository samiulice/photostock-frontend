import { Component, type OnInit } from "@angular/core"
import { FormBuilder, type FormGroup, type FormArray, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms"
import { Category, PaymentMethod, Plan, Subscription, UserProfile } from "../../../core/interfaces/user.interface"
import { ProfileService } from "../../../core/services/profile.service"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-profile",
  templateUrl: "./admin-profile.html",
  styleUrls: ["./admin-profile.css"],
  imports:[ReactiveFormsModule, CommonModule]
})
export class AdminProfile implements OnInit {
  activeTab = "profile"
  isEditing = false
  showCreatePlan = false
  showCreateCategory = false
  imagePreview = ""

  userProfile: UserProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "January 2023",
  }

  subscription: Subscription = {
    plan: "Pro",
    status: "active",
    nextBilling: "2024-02-15",
    price: 29.99,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Team collaboration",
    ],
  }

  paymentMethods: PaymentMethod[] = [
    {
      id: "1",
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: "2",
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2024,
      isDefault: false,
    },
  ]

  plans: Plan[] = []
  categories: Category[] = []

  profileForm!: FormGroup
  planForm!: FormGroup
  categoryForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.initializeForms()
    this.loadData()
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      name: [this.userProfile.name, Validators.required],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phone: [this.userProfile.phone],
      location: [this.userProfile.location],
    })

    this.planForm = this.fb.group({
      name: ["", Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      interval: ["monthly", Validators.required],
      category: ["", Validators.required],
      features: this.fb.array([this.fb.control("", Validators.required)]),
    })

    this.categoryForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      image: [""],
    })
  }

  loadData(): void {
    this.profileService.plans$.subscribe((plans) => {
      this.plans = plans
    })

    this.profileService.categories$.subscribe((categories) => {
      this.categories = categories
    })
  }

  get planFeatures(): FormArray {
    return this.planForm.get("features") as FormArray
  }

  addFeature(): void {
    this.planFeatures.push(this.fb.control("", Validators.required))
  }

  removeFeature(index: number): void {
    if (this.planFeatures.length > 1) {
      this.planFeatures.removeAt(index)
    }
  }

  onTabChange(tab: string): void {
    this.activeTab = tab
  }

  toggleEdit(): void {
    if (this.isEditing) {
      this.saveProfile()
    } else {
      this.isEditing = true
    }
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.userProfile = { ...this.userProfile, ...this.profileForm.value }
      this.isEditing = false
    }
  }

  createPlan(): void {
    if (this.planForm.valid) {
      const formValue = this.planForm.value
      const newPlan: Plan = {
        id: Date.now().toString(),
        name: formValue.name,
        price: formValue.price,
        interval: formValue.interval,
        features: formValue.features.filter((f: string) => f.trim() !== ""),
        category: formValue.category,
        status: "active",
        createdDate: new Date().toISOString().split("T")[0],
      }

      this.profileService.addPlan(newPlan)
      this.resetPlanForm()
      this.showCreatePlan = false
    }
  }

  createCategory(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formValue.name,
        description: formValue.description,
        image: formValue.image || "/placeholder.svg?height=80&width=80",
        planCount: 0,
        createdDate: new Date().toISOString().split("T")[0],
      }

      this.profileService.addCategory(newCategory)
      this.resetCategoryForm()
      this.showCreateCategory = false
    }
  }

  resetPlanForm(): void {
    this.planForm.reset({
      name: "",
      price: 0,
      interval: "monthly",
      category: "",
    })

    // Reset features array to have one empty field
    while (this.planFeatures.length > 1) {
      this.planFeatures.removeAt(1)
    }
    this.planFeatures.at(0).setValue("")
  }

  resetCategoryForm(): void {
    this.categoryForm.reset()
    this.imagePreview = ""
  }

  onImageUpload(event: Event): void {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        this.imagePreview = result
        this.categoryForm.patchValue({ image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  removeImage(): void {
    this.imagePreview = ""
    this.categoryForm.patchValue({ image: "" })
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "expired":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  cancelPlanCreation(): void {
    this.showCreatePlan = false
    this.resetPlanForm()
  }

  cancelCategoryCreation(): void {
    this.showCreateCategory = false
    this.resetCategoryForm()
  }
}
