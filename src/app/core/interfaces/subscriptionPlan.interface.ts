import { IResp } from "./auth.interface";

export interface IPlan {
	title: string;
	terms: string[];
	concat_terms: string;
	status: boolean;
	price:number;
	download_limit: number;
	expires_at: number;
	created_at: string;
	updated_at: string;
}
export interface IPlanWithID extends IPlan{
		id: number;
}
export interface IPlanListWithResp extends IResp {
	plans: IPlanWithID[];
}

export interface IPlanWithResp extends IResp {
	plan: IPlanWithID;
}

export interface ISubscription {
  user_id: number;
  subscription_plan_id: number;
  plan_details: IPlan;
  payment_amount: number;
  payment_time: string; // ISO date string
  total_downloads: number;
  status: boolean;
  created_at: string;   // ISO date string
  updated_at: string;   // ISO date string
}

export interface ISubscriptionWithID extends ISubscription{
		id: number;
}
export interface ISubscriptionListWithResp extends IResp {
	subscriptions: ISubscriptionWithID[];
}

export interface ISubscriptionWithResp extends IResp {
	subscription: ISubscriptionWithID;
}
