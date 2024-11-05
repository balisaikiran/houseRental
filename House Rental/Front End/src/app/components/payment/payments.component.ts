import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.isLoading = true;
    this.paymentService.getPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading payments:', error);
        this.errorMessage = 'Failed to load payments. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  makeTestPayment() {
    const newPayment: Partial<Payment> = {
      rentalId: 1, // Make sure this rental ID exists in your database
      amount: 1500,
      paymentDate: new Date(),
      paymentMethod: 'Credit Card',
      paymentStatus: 'Pending'
    };

    this.paymentService.makePayment(newPayment).subscribe({
      next: (response) => {
        console.log('Payment created:', response);
        this.loadPayments();
      },
      error: (error) => {
        console.error('Error creating payment:', error);
        this.errorMessage = 'Failed to create payment. Please try again.';
      }
    });
  }

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }
}
