namespace HouseRentalApplication.Models.DTOs
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } // card, bank transfer
        public string PaymentStatus { get; set; } // pending, paid
        public int RentalId { get; set; } // Foreign key
        // Exclude navigation properties to avoid circular references
    }
}
