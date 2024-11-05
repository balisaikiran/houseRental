export interface Payment {
  paymentId?: number;
  paymentDate: Date;
  amount: number;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Bank Transfer';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  rentalId: number;
  rental?: {
    property?: {
      address: string;
    }
  };
} 