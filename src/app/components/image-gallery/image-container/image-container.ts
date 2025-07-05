import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IMedia,
  IMediaCategory,
} from '../../../core/interfaces/content.interface';

@Component({
  selector: 'app-image-container',
  imports: [CommonModule],
  templateUrl: './image-container.html',
  styleUrl: './image-container.css',
})
export class ImageContainer implements OnInit {
  @Input() category!: string;

  images: IMedia[] = [];

  ngOnInit(): void {
    this.loadImagesByCategory(this.category)
  }
  ngOnChanges() {
    this.loadImagesByCategory(this.category);
  }

  loadImagesByCategory(category: string) {
    // Mock static data
    const cat: IMediaCategory = {
      id: 1,
      name: 'Kitchen',
      created_at: new Date('2024-11-15T09:30:00Z'),
      updated_at: new Date('2025-01-10T08:20:00Z'),
    };
    const allImages: IMedia[] = [
      {
        id: 1,
        media_uuid: 'uuid-001',
        media_title: 'Modern Kitchen Interior',
        description: 'A sleek modern kitchen design with marble counter.',
        category_id: 2,
        total_earnings: 150,
        license_type: 0,
        media_category: cat,
        created_at: new Date('2024-11-15T09:30:00Z'),
        updated_at: new Date('2025-01-10T08:20:00Z'),
      },

      {
        id: 2,
        media_uuid: 'uuid-002',
        media_title: 'Tropical House Plant',
        description: 'Bright green monstera deliciosa in a ceramic pot.',
        category_id: 3,
        total_earnings: 75,
        license_type: 1,
        media_category: cat,
        created_at: new Date('2024-11-15T09:30:00Z'),
        updated_at: new Date('2025-01-10T08:20:00Z'),
      },
       {
    id: 3,
    media_uuid: 'uuid-003',
    media_title: 'Desk Lamp on Workspace',
    description: 'A warm yellow light from a vintage desk lamp.',
    category_id: 4,
    total_earnings: 200,
    license_type: 0, // premium
   media_category: cat,
    created_at: new Date('2024-10-20T14:00:00Z'),
    updated_at: new Date('2025-01-03T15:40:00Z')
  },
  {
    id: 4,
    media_uuid: 'uuid-004',
    media_title: 'Minimalist Office Setup',
    description: 'A clean desk with a monitor, keyboard, and plant.',
    category_id: 5,
    total_earnings: 50,
    license_type: 1, // free
   media_category: cat,
    created_at: new Date('2024-09-01T08:00:00Z'),
    updated_at: new Date('2024-12-01T10:00:00Z')
  },
  {
    id: 5,
    media_uuid: 'uuid-005',
    media_title: 'Colorful Home Decor',
    description: 'A bright room with colorful cushions and rugs.',
    category_id: 6,
    total_earnings: 300,
    license_type: 0,
   media_category: cat,
    created_at: new Date('2024-11-05T11:11:00Z'),
    updated_at: new Date('2025-01-15T12:30:00Z')
  },
  {
    id: 6,
    media_uuid: 'uuid-005',
    media_title: 'Colorful Home Decor',
    description: 'A bright room with colorful cushions and rugs.',
    category_id: 6,
    total_earnings: 300,
    license_type: 0,
   media_category: cat,
    created_at: new Date('2024-11-05T11:11:00Z'),
    updated_at: new Date('2025-01-15T12:30:00Z')
  }
    ];

    this.images = allImages;
  }
}
