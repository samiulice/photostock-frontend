import { IUserWithID } from "./user.interface";

export interface IAuth extends IResp {
    token:string;
    user:IUserWithID
}
export interface IResp {
    error:boolean;
    message:string;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
// download-history.interface.ts
export interface IDownloadHistory {
  id: number;
  fileName: string;
  fileType: string;
  downloadedAt: Date;
  sizeMB: number;
}

