import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group" *ngIf="!isLogin">
            <label>Name:</label>
            <input type="text" [(ngModel)]="user.name" name="name" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" [(ngModel)]="user.email" name="email" required>
          </div>
          <div class="form-group">
            <label>Phone Number:</label>
            <input type="tel" [(ngModel)]="user.phoneNumber" name="phone" required>
          </div>
          <div class="form-group">
            <label>Username:</label>
            <input type="text" [(ngModel)]="user.username" name="username" required>
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" [(ngModel)]="password" name="password" required>
          </div>
          <div class="form-group" *ngIf="!isLogin">
            <label>User Type:</label>
            <select [(ngModel)]="user.userType" name="userType" required>
              <option value="owner">Owner</option>
              <option value="seeker">Seeker</option>
            </select>
          </div>
          <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
        </form>
        <p (click)="toggleMode()">
          {{ isLogin ? 'Need an account? Sign up' : 'Already have an account? Login' }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    .auth-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    p {
      text-align: center;
      margin-top: 1rem;
      color: #007bff;
      cursor: pointer;
    }
  `]
})
export class AuthComponent {
  isLogin = true;
  user = {
    name: '',
    email: '',
    phoneNumber: '',
    username: '',
    userType: 'seeker'
  };
  password = '';

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    // TODO: Implement authentication logic
    console.log('Form submitted', this.user);
  }
}