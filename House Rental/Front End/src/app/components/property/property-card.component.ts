import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Property } from '../../models/user.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="property-card">
      <div class="property-header">
        <h3>{{ property.propertyType }} in {{ property.city }}</h3>
        <span class="status" [class.available]="property.status === 'Available'">
          {{ property.status }}
        </span>
      </div>
      
      <div class="property-details">
        <p class="price">{{ property.price }}/month</p>
        <p>{{ property.bedroomsCount }} bed • {{ property.bathroomsCount }} bath</p>
        <p>{{ property.furnished }} furnished</p>
        <p>{{ property.availability }} availability</p>
      </div>
      
      <div class="property-features">
        <span>{{ property.parkingIncluded ? '✓' : '✗' }} Parking</span>
        <span>{{ property.petsAllowed ? '✓' : '✗' }} Pets</span>
      </div>
      
      <div class="property-actions" *ngIf="!isSeeker">
        <button class="btn-secondary" (click)="onEdit()">Edit</button>
        <button class="btn-primary" (click)="onToggleStatus()">
          {{ property.status === 'Available' ? 'Mark as Rented' : 'Mark as Available' }}
        </button>
        <button class="btn-danger" (click)="onDelete()">Delete</button>
      </div>

      <div class="property-actions" *ngIf="isSeeker && property.status === 'Available'">
        <button class="btn-primary" (click)="onContact()">Contact Owner</button>
      </div>
    </div>
  `,
  styles: [`
    .property-card {
      background: white;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .property-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      background: #dc3545;
      color: white;
    }
    .status.available {
      background: #28a745;
    }
    .property-details {
      margin-bottom: 1rem;
    }
    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: #007bff;
    }
    .property-features {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .property-actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class PropertyCardComponent {
  @Input() property!: Property;
  @Input() isSeeker = false;
  @Output() edit = new EventEmitter<Property>();
  @Output() toggleStatus = new EventEmitter<Property>();
  @Output() delete = new EventEmitter<Property>();
  @Output() contact = new EventEmitter<Property>();

  onEdit() {
    this.edit.emit(this.property);
  }

  onToggleStatus() {
    this.toggleStatus.emit(this.property);
  }

  onDelete() {
    this.delete.emit(this.property);
  }

  onContact() {
    this.contact.emit(this.property);
  }
}