import { Component } from '@angular/core';
import { Carousel } from "../carousel/carousel";
import { Stats } from "../stats/stats";
import { PlanCards } from "../plan-cards/plan-cards";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class Homepage {
  // app.ts
// Image data and utility functions
 mockImages: Record<string, any> = {
    "1": {
        id: "1",
        url: "https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=1770",
        title: "Mountain landscape at sunset",
        author: "John Doe",
        authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        description: "Beautiful mountain landscape captured at sunset with dramatic sky colors.",
        resolution: "5000 x 3333 px",
        uploadDate: "April 15, 2023",
        likes: 542,
        downloads: 1235,
        tags: ["nature", "mountains", "sunset", "landscape", "outdoors"]
    },
    // ... other images
};

 similarImages = [
    {
        id: '9',
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1770',
        title: 'Beautiful mountain landscape',
        author: 'Alex Green',
        likes: 342
    },
    // ... other similar images
];

 searchResults = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=1770',
        title: 'Mountain landscape at sunset',
        author: 'John Doe',
        likes: 542
    },
    // ... other search results
];

// Utility functions
 getImageById(id: string) {
    return this.mockImages[id];
}

 getQueryParam(name: string): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Page-specific functions
 initImageDetailPage() {
    const imageId = this.getQueryParam('id') || '1';
    const image = this.getImageById(imageId);
    
    if (!image) {
        document.querySelector('main')!.innerHTML = '<div class="text-center py-12">Image not found</div>';
        return;
    }

    // Render image details
    // ... implementation
}


// Simple toast implementation
//  showToast(title: string, message: any, type: string) {
//   // Remove any existing toast
//   const existing = document.getElementById('custom-toast');
//   if (existing) existing.remove();

//   const toast = document.createElement('div');
//   toast.id = 'custom-toast';
//   toast.style.position = 'fixed';
//   toast.style.bottom = '30px';
//   toast.style.right = '30px';
//   toast.style.minWidth = '250px';
//   toast.style.padding = '16px 24px';
//   toast.style.background = type === 'error' ? '#f44336' : (type === 'success' ? '#4caf50' : '#333');
//   toast.style.color = '#fff';
//   toast.style.borderRadius = '8px';
//   toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
//   toast.style.zIndex = '9999';
//   toast.style.fontSize = '16px';
//   toast.innerHTML = `<strong>${title}</strong><div style="margin-top:4px;">${message}</div>`;

//   document.body.appendChild(toast);

//   setTimeout(() => {
//     toast.remove();
//   }, 3000);
// }

// Initialize page based on current URL using Angular lifecycle hook
// ngOnInit(): void {
//     const path = window.location.pathname.split('/').pop();

//     switch (path) {
//         case 'image-detail.html':
//             this.initImageDetailPage();
//             break;
//         case 'login.html':
//             this.initLoginPage();
//             break;
//         case 'signup.html':
//             this.initSignupPage();
//             break;
//         case 'search.html':
//             this.initSearchPage();
//             break;
//     }
// }




}

