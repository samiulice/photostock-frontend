import { isSubscription } from "rxjs/internal/Subscription";
import { IResp } from "./auth.interface";

export interface ISubscriptionPlan  {
	ID :  number   ;
	Title:  string  ;
	Terms: string  ;
	Status : boolean   ;
	DownloadLimit :number    ;
	ExpiresAt: number  ;
	CreatedAt : string;
	UpdatedAt : string;
}
export interface ISubscriptionPlanListWithResp extends IResp{
	subscriptionPlan:ISubscriptionPlan[];

}export interface ISubscriptionPlanWithResp extends IResp{
	subscriptionPlan:ISubscriptionPlan;

}