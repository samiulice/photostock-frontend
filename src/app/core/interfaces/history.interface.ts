export interface IHistoryItem {
  id: number;
  fileName: string;
  category: string;
  type: string;
  license: string;
  size: string;
  resolution: string;
 
}

export interface IDownloadHistoryItem extends IHistoryItem{
   downloadedAt: string;

}
export interface IUploadHistoryItem extends IHistoryItem{
  uploadedAt:string;
  totalDownload:number;
}

//remove

export interface UploadHistoryItem {
  fileType: string;
  fileName: string;
  category: string;
  fileSize: number;       // Assuming it's in bytes
  uploadDate: string;     // Or `Date` if parsed
  // status: 'pending' | 'completed' | 'failed' | string;  // Extend with your statuses
  status:boolean
}