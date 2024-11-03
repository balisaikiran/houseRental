export interface User {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  username: string;
  userType: 'owner' | 'seeker';
}

export interface Property {
  id?: number;
  ownerId: number;
  country: string;
  state: string;
  city: string;
  propertyType: 'Apartment' | 'House';
  price: number;
  bedroomsCount: number;
  bathroomsCount: number;
  parkingIncluded: boolean;
  petsAllowed: boolean;
  furnished: 'None' | 'Semi' | 'Fully';
  availability: 'Immediate' | 'Later';
  additionalNotes?: string;
  status: 'Available' | 'Rented';
}