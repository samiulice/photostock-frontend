export interface IUser {
  name: string;
  avatar_url: string;
  status: boolean;
  role: 'user' | 'admin' | 'premium';
  email: string;
  mobile: string;
  total_earnings: number;
  address: string;
  subscription_id: number | null;
  created_at: string;  // use string if it's ISO string from API
  updated_at: string;
}

export interface IUserWithID extends IUser{
    id:string
    
}




//remove
export interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  joinDate: string
}

export interface Subscription {
  plan: string
  status: "active" | "cancelled" | "expired"
  nextBilling: string
  price: number
  features: string[]
}

export interface PaymentMethod {
  id: string
  type: "card" | "paypal"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Plan {
  id: string
  name: string
  price: number
  interval: "monthly" | "yearly"
  features: string[]
  category: string
  status: "active" | "inactive"
  createdDate: string
}

export interface Category {
  id: string
  name: string
  description: string
  image?: string
  planCount: number
  createdDate: string
}

