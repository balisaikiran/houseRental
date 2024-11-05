import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavComponent],
  template: `
    <app-nav></app-nav>
    <div class="home-container">
      <div class="welcome-section">
        <h1>Welcome to House Rental</h1>
        <p>Find your perfect home or list your property</p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card" (click)="navigateTo('/properties')">
          <h3>Browse Properties</h3>
          <p>Explore available properties for rent</p>
        </div>
        
        <div class="feature-card" (click)="navigateTo('/rentals')">
          <h3>My Rentals</h3>
          <p>Manage your current rentals</p>
        </div>
        
        <div class="feature-card" (click)="navigateTo('/payments')">
          <h3>Payments</h3>
          <p>View and manage your payments</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
    }
    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
      h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.2rem;
        color: #666;
      }
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }
    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-5px);
      }
      h3 {
        color: #2c3e50;
        margin-bottom: 1rem;
      }
      p {
        color: #666;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
} 