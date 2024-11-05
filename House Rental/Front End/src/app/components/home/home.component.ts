import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <h1>Welcome to Property Rental</h1>
      <button class="btn-primary" (click)="logout()">Logout</button>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }
} 