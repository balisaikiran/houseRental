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
        
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" name="email" required>
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" name="password" required>
        </div>
        
        <button type="submit" class="btn-primary">{{ isLogin ? 'Login' : 'Register' }}</button>
        
        <p>
          {{ isLogin ? 'Need an account?' : 'Already have an account?' }}
          <a href="#" (click)="toggleAuthMode($event)">
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
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AuthComponent {
  isLogin = true;
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    
    if (this.isLogin) {
      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    } else {
      this.authService.register(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }

  toggleAuthMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
  }
}