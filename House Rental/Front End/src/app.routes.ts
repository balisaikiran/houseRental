import { Routes } from '@angular/router';
import { AuthComponent } from './app/components/auth/auth.component';
import { HomeComponent } from './app/components/home/home.component';
import { AuthGuard } from './app/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }
]; 