using AutoMapper;
using HouseRentalApplication.Models.Entity;
using HouseRentalApplication.Models.DTOs;

namespace HouseRentalApplication.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // User mappings
            CreateMap<User, UserDto>()
                .ReverseMap(); // Allows mapping in both directions

            // Property mappings
            CreateMap<Property, PropertyDto>()
                .ReverseMap();

            // Rental mappings
            CreateMap<Rental, RentalDto>()
                .ReverseMap();

            // Payment mappings
            CreateMap<Payment, PaymentDto>()
                .ReverseMap();

            // Add more mappings here as needed
        }
    }
}
