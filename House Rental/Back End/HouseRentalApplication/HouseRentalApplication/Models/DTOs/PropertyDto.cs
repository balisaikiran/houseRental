namespace HouseRentalApplication.Models.DTOs
{
    public class PropertyDto
    {
        public int PropertyId { get; set; }
        public string? Address { get; set; }
        public decimal? RentPrice { get; set; }
        public string? PropertyType { get; set; } // apartment, house, etc.
        public string? Description { get; set; }
        public string? Status { get; set; } // available, rented
        public int LandlordId { get; set; } // Foreign key
    }
}
