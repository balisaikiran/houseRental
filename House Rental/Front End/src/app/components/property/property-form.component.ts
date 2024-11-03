import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Property } from '../../models/user.model';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="property-form">
      <h3>{{ property.id ? 'Edit' : 'Add' }} Property</h3>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Country:</label>
          <input type="text" [(ngModel)]="property.country" name="country" required>
        </div>
        
        <div class="form-group">
          <label>State:</label>
          <input type="text" [(ngModel)]="property.state" name="state" required>
        </div>
        
        <div class="form-group">
          <label>City:</label>
          <input type="text" [(ngModel)]="property.city" name="city" required>
        </div>
        
        <div class="form-group">
          <label>Property Type:</label>
          <select [(ngModel)]="property.propertyType" name="propertyType" required>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Price:</label>
          <input type="number" [(ngModel)]="property.price" name="price" required>
        </div>
        
        <div class="form-group">
          <label>Bedrooms:</label>
          <input type="number" [(ngModel)]="property.bedroomsCount" name="bedrooms" required>
        </div>
        
        <div class="form-group">
          <label>Bathrooms:</label>
          <input type="number" [(ngModel)]="property.bathroomsCount" name="bathrooms" required>
        </div>
        
        <div class="form-group">
          <label>Parking Included:</label>
          <select [(ngModel)]="property.parkingIncluded" name="parking" required>
            <option [ngValue]="true">Yes</option>
            <option [ngValue]="false">No</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Pets Allowed:</label>
          <select [(ngModel)]="property.petsAllowed" name="pets" required>
            <option [ngValue]="true">Yes</option>
            <option [ngValue]="false">No</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Furnished:</label>
          <select [(ngModel)]="property.furnished" name="furnished" required>
            <option value="None">None</option>
            <option value="Semi">Semi</option>
            <option value="Fully">Fully</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Availability:</label>
          <select [(ngModel)]="property.availability" name="availability" required>
            <option value="Immediate">Immediate</option>
            <option value="Later">Later</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Additional Notes:</label>
          <textarea [(ngModel)]="property.additionalNotes" name="notes" rows="3"></textarea>
        </div>
        
        <div class="button-group">
          <button type="submit" class="btn-primary">Save</button>
          <button type="button" class="btn-secondary" (click)="onCancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .property-form {
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .btn-primary, .btn-secondary {
      flex: 1;
    }
  `]
})
export class PropertyFormComponent {
  @Input() property: Partial<Property> = {
    propertyType: 'Apartment',
    furnished: 'None',
    availability: 'Immediate',
    status: 'Available'
  };
  
  @Output() save = new EventEmitter<Property>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.property as Property);
  }

  onCancel() {
    this.cancel.emit();
  }
}