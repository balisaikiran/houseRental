import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <form (ngSubmit)="onSubmit()">
        <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
        
        <div class="form-group" *ngIf="!isLogin">
          <label>Name</label>
          <input type="text" [(ngModel)]="name" name="name" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required>
        </div>

        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required>
        </div>

        <button type="submit" class="btn-primary">{{ isLogin ? 'Login' : 'Register' }}</button>
        
        <p class="toggle-mode">
          {{ isLogin ? 'Need an account?' : 'Already have an account?' }}
          <a href="#" (click)="toggleMode($event)">
            {{ isLogin ? 'Register' : 'Login' }}
          </a>
        </p>
      </form>
    </div>
  `,
  styles: [`
    .auth-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  `]
})
export class AuthComponent {
  isLogin = true;
  email = '';
  password = '';
  name = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.isLogin) {
      this.authService.login({ email: this.email, password: this.password })
        .subscribe({
          next: (response) => {
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            alert('Login failed: ' + (error.error?.message || 'Unknown error'));
          }
        });
    } else {
      this.authService.register({ 
        email: this.email, 
        password: this.password,
        name: this.name 
      }).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed: ' + (error.error?.message || 'Unknown error'));
        }
      });
    }
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }
}