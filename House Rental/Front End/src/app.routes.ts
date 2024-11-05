import { Routes } from '@angular/router';
import { AuthComponent } from './app/components/auth/auth.component';
import { HomeComponent } from './app/components/home/home.component';
import { PropertiesComponent } from './app/components/property/properties.component';
import { RentalsComponent } from './app/components/rental/rentals.component';
import { PaymentsComponent } from './app/components/payment/payments.component';
import { AuthGuard } from './app/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuard] },
  { path: 'rentals', component: RentalsComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] }
]; 