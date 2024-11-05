import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { RentalService } from '../../services/rental.service';

interface Rental {
  property?: {
    propertyType: string;
    city: string;
  };
  status: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  contractFile?: string;
}

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss']
})
export class RentalsComponent implements OnInit {
  rentals: Rental[] = [];
  errorMessage: string = '';

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
    this.loadRentals();
  }

  loadRentals() {
    this.rentalService.getRentals().subscribe({
      next: (data: Rental[]) => {
        this.rentals = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading rentals:', error);
        this.errorMessage = 'Failed to load rentals. Please try again later.';
      }
    });
  }

  viewLease(contractFile?: string) {
    if (!contractFile) {
      this.errorMessage = 'Lease document not available';
      return;
    }
    
    try {
      window.open(contractFile, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening lease document:', error);
      this.errorMessage = 'Error opening lease document';
    }
  }
}