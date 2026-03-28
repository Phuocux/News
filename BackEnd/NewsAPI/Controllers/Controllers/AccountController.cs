using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.AppDataContext;
using NewsAPI.Models;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly NewsDbContext _context;

        public AccountController(NewsDbContext context)
        {
            _context = context;
        }

        // POST create account
        [HttpPost]
        public async Task<IActionResult> Create(Account account)
        {
            account.Id = Guid.NewGuid();
            account.CreatedAt = DateTime.Now;

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            return Ok(account);
        }

        // GET all accounts
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var accounts = await _context.Accounts.ToListAsync();
            return Ok(accounts);
        }

        // GET account by id
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var account = await _context.Accounts.FindAsync(id);

            if (account == null)
            {
                return NotFound(new { message = $"Account with id {id} not found" });
            }

            return Ok(account);
        }
    }
}