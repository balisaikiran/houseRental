using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseRentalApplication.Data;
using HouseRentalApplication.Models.Entity;

namespace HouseRentalApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PropertiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Properties
        [HttpPost]
        public async Task<IActionResult> CreateProperty([FromBody] Property property)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Properties.Add(property);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPropertyById), new { id = property.PropertyId }, property);
        }

        // GET: api/Properties
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
        {
            return await _context.Properties.Include(p => p.Landlord).ToListAsync();
        }

        // GET: api/Properties/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Property>> GetPropertyById(int id)
        {
            var property = await _context.Properties.Include(p => p.Landlord)
                                    .FirstOrDefaultAsync(p => p.PropertyId == id);

            if (property == null)
            {
                return NotFound();
            }

            return property;
        }

        // GET: api/Properties/landlord/{landlordId}
        [HttpGet("landlord/{landlordId}")]
        public async Task<ActionResult<IEnumerable<Property>>> GetPropertiesByLandlordId(int landlordId)
        {
            var properties = await _context.Properties
                .Where(p => p.LandlordId == landlordId)
                .Include(p => p.Landlord)
                .ToListAsync();

            if (properties == null || !properties.Any())
            {
                return NotFound("No properties found for this landlord.");
            }

            return properties;
        }

        // PUT: api/Properties/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(int id, [FromBody] Property property)
        {
            if (id != property.PropertyId || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Entry(property).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Properties/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property == null)
            {
                return NotFound();
            }

            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PropertyExists(int id)
        {
            return _context.Properties.Any(e => e.PropertyId == id);
        }
    }
}
