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
