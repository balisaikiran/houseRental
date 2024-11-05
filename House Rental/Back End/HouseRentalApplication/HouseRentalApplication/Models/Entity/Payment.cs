namespace HouseRentalApplication.Models.Entity
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string? PaymentMethod { get; set; } // Make nullable
        public string? PaymentStatus { get; set; } // Make nullable

        // Foreign key
        public int RentalId { get; set; }

        // Navigation property
        public Rental? Rental { get; set; } // Make nullable
    }
}
