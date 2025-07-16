import { IResp } from "./auth.interface";

export interface IHistory {
  id: number;
  media_id: string;
  user_id: number;
  file_type: string;
  file_ext: string;
  file_name: string;
  file_size: string;
  resolution: string;
}

export interface IDownloadHistory extends IHistory{
   downloaded_at: string;

}
export interface IUploadHistory extends IHistory{
  uploaded_at:string;
}

export interface IUploadHistoryListWithResp extends IResp {
  history:IUploadHistory[];
}
export interface IDownloadHistoryListWithResp extends IResp {
  history:IDownloadHistory[];
}