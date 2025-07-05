import { IResp } from "./auth.interface";

export interface IMediaCategory {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface IMedia {
  id: number;
  media_uuid: string;
  media_title: string;
  description: string;
  category_id?: number | null;
  total_earnings: number;
  license_type: number; // 0 = premium, 1 = free
  media_category: IMediaCategory;
  created_at: Date;
  updated_at: Date;
}

export interface IMediaCategoryListResp extends IResp{
    media_categories:IMediaCategory[]
}
