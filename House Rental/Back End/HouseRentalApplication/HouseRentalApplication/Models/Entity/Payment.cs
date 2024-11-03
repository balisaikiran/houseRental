namespace HouseRentalApplication.Models.Entity
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } // card, bank transfer
        public string PaymentStatus { get; set; } // pending, paid

        // Foreign key
        public int RentalId { get; set; }

        // Navigation property
        public Rental Rental { get; set; }
    }
}
