import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from '../nav/nav.component';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  errorMessage: string = '';

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        this.errorMessage = 'Failed to load properties. Please try again later.';
      }
    });
  }

  rentProperty(propertyId: number) {
    this.propertyService.rentProperty(propertyId).subscribe({
      next: () => {
        this.errorMessage = '';
        alert('Property rented successfully!');
        this.loadProperties(); // Refresh the list
      },
      error: (error) => {
        console.error('Error renting property:', error);
        this.errorMessage = 'Failed to rent property. Please try again later.';
      }
    });
  }
}
