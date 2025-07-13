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

export interface PaymentHistory {
  id: string
  date: string
  amount: number
  status: "completed" | "pending" | "failed"
  method: string
  description: string
  invoiceUrl?: string
}

export interface UploadHistory {
  id: string
  fileName: string
  fileSize: number
  uploadDate: string
  status: "completed" | "processing" | "failed"
  fileType: string
  category: string
}

export interface DownloadHistory {
  id: string
  fileName: string
  downloadDate: string
  fileSize: number
  downloadCount: number
  fileType: string
  category: string
}
