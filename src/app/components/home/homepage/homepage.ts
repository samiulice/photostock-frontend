import { Component, OnInit } from '@angular/core';
import { Carousel } from "../carousel/carousel";
import { Stats } from "../stats/stats";
import { PlanCards } from "../plan-cards/plan-cards";
import { ContentService } from '../../../core/services/content/content.service';
import { IMediaCategory } from '../../../core/interfaces/content.interface';
import { UploadService } from '../../../core/services/upload/upload-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConstService } from '../../../core/services/constants/const.service';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink, PlanCards],
    templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class Homepage implements OnInit {
    categories:IMediaCategory[]=[];
    baseURL!:string
    message='';
    constructor(private  uploadService:UploadService, private constant:ConstService ){}
    ngOnInit(): void {
        this.uploadService.getCategories().subscribe({next:(res)=>{
            console.log('category response',res)
            if(res.error){
                this.message=res.message;
                return
            }
    
            this.categories=res.media_categories
            this.baseURL = this.constant.getHostURL()
        },
    
             error: (err) => {
        console.error('Failed to load categories', err);
      },
        });
    
        
    }
    
    //category service
}