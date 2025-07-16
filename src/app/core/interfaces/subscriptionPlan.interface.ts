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