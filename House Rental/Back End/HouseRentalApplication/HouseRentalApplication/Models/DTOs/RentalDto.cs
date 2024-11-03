namespace HouseRentalApplication.Models.DTOs
{
    public class RentalDto
    {
        public int RentalId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? MonthlyRent { get; set; }
        public decimal? SecurityDeposit { get; set; }
        public string? LeaseTerms { get; set; } // JSON or detailed terms
        public string? Status { get; set; } // active, completed
        public string? ContractFile { get; set; } // URL or file location
        public int? TenantId { get; set; }
        public int? PropertyId { get; set; }
        // Exclude navigation properties to avoid circular references
    }
}
