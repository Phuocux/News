using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.AppDataContext;
using Microsoft.AspNetCore.Authorization;
using NewsAPI.Models;   

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly NewsDbContext _context;

        public ArticlesController(NewsDbContext context)
        {
            _context = context;
        }

        // ================= GET ALL =================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var articles = await _context.Articles
                .Include(a => a.Author)
                .Include(a => a.Category)
                .ToListAsync();

            var result = articles.Select(article => new {
                title = article.Title,
                image = article.ImageUrl,
                author = article.Author.Username,
                date = article.CreatedAt,
                content = article.Content,
                category = article.Category.Name
            });

            return Ok(result);
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var article = await _context.Articles
                .Include(a => a.Author)
                .Include(a => a.Category)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (article == null)
                return NotFound();

            var result = new {
                title = article.Title,
                image = article.ImageUrl,
                author = article.Author.Username,
                date = article.CreatedAt,
                content = article.Content,
                category = article.Category.Name
            };

            return Ok(result);
        }

        // ================= CREATE =================
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Article article)
        {
            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
        }

        // ================= UPDATE =================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Article updated)
        {
            if (id != updated.Id)
                return BadRequest();

            _context.Entry(updated).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(updated);
        }

        // ================= DELETE =================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
                return NotFound();

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}