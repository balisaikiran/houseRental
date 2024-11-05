export interface Payment {
  paymentId?: number;
  rentalId: number;
  amount: number;
  paymentDate: Date;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Bank Transfer';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  rental?: {
    property?: {
      address: string;
      propertyType: string;
      city: string;
    };
  };
} 