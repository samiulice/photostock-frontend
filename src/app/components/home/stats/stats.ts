import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats {
    stats = {
    totalImages: 5600,
    totalUsers: 1200,
    premiumMembers: 250
  };

}
