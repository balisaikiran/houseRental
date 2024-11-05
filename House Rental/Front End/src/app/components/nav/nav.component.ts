import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">House Rental</div>
      <div class="nav-links">
        <a (click)="navigateTo('/properties')" class="nav-link">Properties</a>
        <a (click)="navigateTo('/rentals')" class="nav-link">My Rentals</a>
        <a (click)="navigateTo('/payments')" class="nav-link">Payments</a>
        <button class="btn-logout" (click)="logout()">Logout</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .nav-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: #007bff;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
    .nav-link {
      color: #333;
      text-decoration: none;
      cursor: pointer;
      &:hover {
        color: #007bff;
      }
    }
    .btn-logout {
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: #c82333;
      }
    }
  `]
})
export class NavComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
