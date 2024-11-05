import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private apiUrl = 'http://localhost:5132/api/rentals';

  constructor(private http: HttpClient) {}

  getRentals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRentalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createRental(rentalData: any): Observable<any> {
    return this.http.post(this.apiUrl, rentalData);
  }
}
