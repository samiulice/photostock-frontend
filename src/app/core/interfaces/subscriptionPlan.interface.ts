import { IResp } from "./auth.interface";

export interface IPlan {
	Title: string;
	Terms: string[];
	Status: boolean;
	Price:number;
	DownloadLimit: number;
	ExpiresAt: number;
	CreatedAt: string;
	UpdatedAt: string;
}
export interface IPlanWithID extends IPlan{
		ID: number;
}
export interface IPlanListWithResp extends IResp {
	plans: IPlanWithID[];
}

export interface IPlanWithResp extends IResp {
	plan: IPlanWithID;
}