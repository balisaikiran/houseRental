using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseRentalApplication.Models.Entity;
using HouseRentalApplication.Models.DTOs;
using AutoMapper;
using HouseRentalApplication.Data;

namespace HouseRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public RentalsController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Rentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RentalDto>>> GetRentals()
        {
            var rentals = await _context.Rentals.ToListAsync();
            var rentalDtos = _mapper.Map<List<RentalDto>>(rentals);
            return Ok(rentalDtos);
        }

        // GET: api/Rentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RentalDto>> GetRental(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);

            if (rental == null)
            {
                return NotFound();
            }

            var rentalDto = _mapper.Map<RentalDto>(rental);
            return Ok(rentalDto);
        }

        // POST: api/Rentals
        [HttpPost]
        public async Task<ActionResult<RentalDto>> CreateRental(RentalDto rentalDto)
        {
            var rental = _mapper.Map<Rental>(rentalDto);
            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();

            rentalDto.RentalId = (int)rental.RentalId; // Update the ID in DTO

            return CreatedAtAction(nameof(GetRental), new { id = rental.RentalId }, rentalDto);
        }

        // PUT: api/Rentals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRental(int id, RentalDto rentalDto)
        {
            if (id != rentalDto.RentalId)
            {
                return BadRequest();
            }

            var rental = await _context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }

            _mapper.Map(rentalDto, rental);
            _context.Entry(rental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Rentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }

            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Rentals/Tenant/5
        [HttpGet("Tenant/{tenantId}")]
        public async Task<ActionResult<IEnumerable<RentalDto>>> GetRentalsByTenantId(int tenantId)
        {
            var rentals = await _context.Rentals
                .Where(r => r.TenantId == tenantId)
                .ToListAsync();

            var rentalDtos = _mapper.Map<List<RentalDto>>(rentals);
            return Ok(rentalDtos);
        }

        private bool RentalExists(int id)
        {
            return _context.Rentals.Any(e => e.RentalId == id);
        }
    }
}
