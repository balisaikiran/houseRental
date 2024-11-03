import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyFormComponent } from '../property/property-form.component';
import { PropertyCardComponent } from '../property/property-card.component';
import { PropertySearchComponent } from '../property/property-search.component';
import { Property } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PropertyFormComponent,
    PropertyCardComponent,
    PropertySearchComponent
  ],
  template: `
    <div class="home-container">
      <nav>
        <button 
          [class.active]="activeTab === 'owner'"
          (click)="activeTab = 'owner'">
          Owner
        </button>
        <button 
          [class.active]="activeTab === 'seeker'"
          (click)="activeTab = 'seeker'">
          Rent Seeker
        </button>
      </nav>

      <div class="content" *ngIf="activeTab === 'owner'">
        <div class="header">
          <h2>My Properties</h2>
          <button class="add-btn" (click)="showPropertyForm = true" *ngIf="!showPropertyForm">
            Add New Property
          </button>
        </div>
        
        <app-property-form
          *ngIf="showPropertyForm"
          [property]="selectedProperty"
          (save)="saveProperty($event)"
          (cancel)="cancelPropertyForm()"
        ></app-property-form>
        
        <div class="property-grid">
          <app-property-card
            *ngFor="let property of properties"
            [property]="property"
            (edit)="editProperty($event)"
            (toggleStatus)="togglePropertyStatus($event)"
            (delete)="deleteProperty($event)"
          ></app-property-card>
        </div>
      </div>

      <div class="content" *ngIf="activeTab === 'seeker'">
        <h2>Search Properties</h2>
        <app-property-search (search)="searchProperties($event)"></app-property-search>
        
        <div class="property-grid">
          <app-property-card
            *ngFor="let property of filteredProperties"
            [property]="property"
            [isSeeker]="true"
            (contact)="contactOwner($event)"
          ></app-property-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 1rem;
    }
    nav {
      margin-bottom: 2rem;
      border-bottom: 1px solid #ddd;
    }
    nav button {
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      border: none;
      background: none;
      cursor: pointer;
    }
    nav button.active {
      border-bottom: 2px solid #007bff;
      color: #007bff;
    }
    .content {
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .add-btn {
      background-color: #28a745;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .property-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
  `]
})
export class HomeComponent {
  activeTab: 'owner' | 'seeker' = 'owner';
  showPropertyForm = false;
  selectedProperty: Partial<Property> = {};
  properties: Property[] = [];
  filteredProperties: Property[] = [];

  saveProperty(property: Property) {
    if (property.id) {
      this.properties = this.properties.map(p => 
        p.id === property.id ? { ...property } : p
      );
    } else {
      const newProperty: Property = {
        ...property,
        id: Date.now(),
        ownerId: 1, // TODO: Get from auth service
        status: 'Available'
      };
      this.properties.push(newProperty);
    }
    this.showPropertyForm = false;
    this.selectedProperty = {};
  }

  editProperty(property: Property) {
    this.selectedProperty = { ...property };
    this.showPropertyForm = true;
  }

  togglePropertyStatus(property: Property) {
    const newStatus: 'Available' | 'Rented' = property.status === 'Available' ? 'Rented' : 'Available';
    const updatedProperty = {
      ...property,
      status: newStatus
    };
    this.properties = this.properties.map(p => 
      p.id === property.id ? updatedProperty : p
    );
  }

  deleteProperty(property: Property) {
    this.properties = this.properties.filter(p => p.id !== property.id);
  }

  cancelPropertyForm() {
    this.showPropertyForm = false;
    this.selectedProperty = {};
  }

  searchProperties(criteria: any) {
    this.filteredProperties = this.properties.filter(property => {
      if (property.status !== 'Available') return false;
      
      if (criteria.city && !property.city.toLowerCase().includes(criteria.city.toLowerCase())) return false;
      
      if (criteria.propertyType && property.propertyType !== criteria.propertyType) return false;
      
      if (criteria.minPrice && property.price < criteria.minPrice) return false;
      if (criteria.maxPrice && property.price > criteria.maxPrice) return false;
      
      if (criteria.bedrooms && property.bedroomsCount < parseInt(criteria.bedrooms)) return false;
      
      if (criteria.furnished && property.furnished !== criteria.furnished) return false;
      
      if (criteria.availability && property.availability !== criteria.availability) return false;
      
      if (criteria.parking && !property.parkingIncluded) return false;
      if (criteria.pets && !property.petsAllowed) return false;
      
      return true;
    });
  }

  contactOwner(property: Property) {
    // TODO: Implement contact owner functionality
    console.log('Contacting owner of property:', property.id);
  }
}