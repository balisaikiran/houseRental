import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-property-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-form">
      <div class="form-row">
        <div class="form-group">
          <label>Location</label>
          <input type="text" [(ngModel)]="searchCriteria.city" name="city" placeholder="City">
        </div>
        
        <div class="form-group">
          <label>Property Type</label>
          <select [(ngModel)]="searchCriteria.propertyType" name="propertyType">
            <option value="">Any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Price Range</label>
          <div class="price-range">
            <input type="number" [(ngModel)]="searchCriteria.minPrice" name="minPrice" placeholder="Min">
            <span>to</span>
            <input type="number" [(ngModel)]="searchCriteria.maxPrice" name="maxPrice" placeholder="Max">
          </div>
        </div>
        
        <div class="form-group">
          <label>Bedrooms</label>
          <select [(ngModel)]="searchCriteria.bedrooms" name="bedrooms">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Furnished</label>
          <select [(ngModel)]="searchCriteria.furnished" name="furnished">
            <option value="">Any</option>
            <option value="None">None</option>
            <option value="Semi">Semi</option>
            <option value="Fully">Fully</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Availability</label>
          <select [(ngModel)]="searchCriteria.availability" name="availability">
            <option value="">Any</option>
            <option value="Immediate">Immediate</option>
            <option value="Later">Later</option>
          </select>
        </div>
      </div>

      <div class="form-row features">
        <div class="checkbox-group">
          <label>
            <input type="checkbox" [(ngModel)]="searchCriteria.parking" name="parking">
            Parking
          </label>
        </div>
        
        <div class="checkbox-group">
          <label>
            <input type="checkbox" [(ngModel)]="searchCriteria.pets" name="pets">
            Pets Allowed
          </label>
        </div>
      </div>

      <button class="btn-primary search-btn" (click)="onSearch()">Search Properties</button>
    </div>
  `,
  styles: [`
    .search-form {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .price-range {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    .price-range input {
      width: calc(50% - 1rem);
    }
    .features {
      margin-top: 1rem;
    }
    .checkbox-group {
      display: flex;
      align-items: center;
    }
    .checkbox-group input {
      margin-right: 0.5rem;
    }
    .search-btn {
      width: 100%;
      margin-top: 1rem;
      padding: 0.75rem;
    }
  `]
})
export class PropertySearchComponent {
  @Output() search = new EventEmitter<any>();

  searchCriteria = {
    city: '',
    propertyType: '',
    minPrice: null,
    maxPrice: null,
    bedrooms: '',
    furnished: '',
    availability: '',
    parking: false,
    pets: false
  };

  onSearch() {
    this.search.emit(this.searchCriteria);
  }
}