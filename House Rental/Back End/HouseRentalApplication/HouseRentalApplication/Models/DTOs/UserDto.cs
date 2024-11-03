﻿namespace HouseRentalApplication.Models.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public string? Role { get; set; } // landlord, tenant, admin
        public string? ProfilePicture { get; set; }
        public DateTime DateJoined { get; set; }
    }
}
