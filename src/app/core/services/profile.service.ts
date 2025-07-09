import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { Category, Plan } from "../interfaces/user.interface"

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private plansSubject = new BehaviorSubject<Plan[]>([
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
  ])

  private categoriesSubject = new BehaviorSubject<Category[]>([
    {
      id: "1",
      name: "Starter",
      description: "Perfect for individuals getting started",
      image: "/placeholder.svg?height=80&width=80",
      planCount: 1,
      createdDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Professional",
      description: "For growing businesses and teams",
      image: "/placeholder.svg?height=80&width=80",
      planCount: 1,
      createdDate: "2024-01-01",
    },
    {
      id: "3",
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      image: "/placeholder.svg?height=80&width=80",
      planCount: 1,
      createdDate: "2024-01-01",
    },
  ])

  public plans$ = this.plansSubject.asObservable()
  public categories$ = this.categoriesSubject.asObservable()

  addPlan(plan: Plan): void {
    const currentPlans = this.plansSubject.value
    this.plansSubject.next([...currentPlans, plan])
  }

  addCategory(category: Category): void {
    const currentCategories = this.categoriesSubject.value
    this.categoriesSubject.next([...currentCategories, category])
  }

  getPlans(): Plan[] {
    return this.plansSubject.value
  }

  getCategories(): Category[] {
    return this.categoriesSubject.value
  }
}
