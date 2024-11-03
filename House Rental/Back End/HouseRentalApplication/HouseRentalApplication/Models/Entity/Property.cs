namespace HouseRentalApplication.Models.Entity
{
    public class Property
    {
        public int PropertyId { get; set; }
        public string? Address { get; set; }
        public decimal? RentPrice { get; set; }
        public string? PropertyType { get; set; } // apartment, house, etc.
        public string? Description { get; set; }
        public string? Status { get; set; } // available, rented

        // Foreign key
        public int LandlordId { get; set; } // Keep as int

        // Navigation properties
        public User? Landlord { get; set; }
        public ICollection<Rental>? Rentals { get; set; } // Make optional
    }
}
