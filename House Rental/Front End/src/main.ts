import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { AuthComponent } from './app/components/auth/auth.component';
import { HomeComponent } from './app/components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes)
  ]
});