using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using NewsAPI.AppDataContext;
using NewsAPI.Models;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly NewsDbContext _context;

    public UsersController(NewsDbContext context)
    {
        _context = context;
    }

    // GET ALL (Admin only)
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) return NotFound();

        return Ok(user);
    }

    [HttpGet("{id}/activity")]
    public async Task<IActionResult> GetUserActivity(int id)
    {
        var user = await _context.Users
            .Where(u => u.Id == id)
            .Select(u => new {
                u.Id,
                u.Username
            })
            .FirstOrDefaultAsync();

        if (user == null) return NotFound();

        var articles = await _context.Articles
            .Where(a => a.AuthorId == id)
            .Select(a => new {
                a.Id,
                a.Title,
                a.CreatedAt,
                a.Status
            })
            .ToListAsync();

        var comments = await _context.Comments
            .Where(c => c.UserId == id)
            .Select(c => new {
                c.Id,
                c.Content,
                c.CreatedAt
            })
            .ToListAsync();

        return Ok(new {
            user,         
            articles,
            comments
        });
    }
}