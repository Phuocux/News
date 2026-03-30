using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using NewsAPI.AppDataContext;
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

        // ================= GET ALL (PUBLIC) =================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var articles = await _context.Articles
                .Where(a => a.Status == "Approved")
                .Include(a => a.Author)
                .Include(a => a.Category)
                .ToListAsync();

            return Ok(articles.Select(a => new {
                a.Id,
                a.Title,
                a.ImageUrl,
                author = a.Author.Username,
                a.CreatedAt,
                a.Views,
                category = a.Category.Name
            }));
        }

        // ================= GET BY ID =================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var article = await _context.Articles
                .Include(a => a.Author)
                .Include(a => a.Category)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (article == null) return NotFound();

            return Ok(new {
                article.Id,
                article.Title,
                article.Content,
                article.ImageUrl,
                article.Status,
                article.Views,
                article.CreatedAt,
                author = article.Author.Username,
                category = article.Category.Name
            });
        }

        // ================= CREATE =================
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateArticleRequest request)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized("Token không hợp lệ");

            var userId = int.Parse(userIdClaim.Value);

            var article = new Article
            {
                Title = request.Title,
                Content = request.Content,
                ImageUrl = request.ImageUrl,
                CategoryId = request.CategoryId,
                AuthorId = userId,
                Status = "Pending",
                CreatedAt = DateTime.Now,
                Views = 0
            };

            _context.Articles.Add(article);
            await _context.SaveChangesAsync();

            return Ok(article);
        }

        // ================= UPDATE =================
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateArticleRequest request)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();

            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized("Token không hợp lệ");

            var userId = int.Parse(userIdClaim.Value);

            // ✅ check quyền chuẩn
            if (article.AuthorId != userId && !User.IsInRole("Admin"))
                return Forbid();

            if (request.Title != null) article.Title = request.Title;
            if (request.Content != null) article.Content = request.Content;
            if (request.ImageUrl != null) article.ImageUrl = request.ImageUrl;
            if (request.CategoryId.HasValue) article.CategoryId = request.CategoryId.Value;

            // ✅ chỉ user thường mới cần duyệt lại
            if (!User.IsInRole("Admin"))
            {
                article.Status = "Pending";
            }

            await _context.SaveChangesAsync();

            return Ok(article);
        }

        // ================= DELETE =================
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();

            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized("Token không hợp lệ");

            var userId = int.Parse(userIdClaim.Value);

            // ✅ admin hoặc author đều xóa được
            if (article.AuthorId != userId && !User.IsInRole("Admin"))
                return Forbid();

            _context.Articles.Remove(article);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ================= APPROVE (ADMIN) =================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/approve")]
        public async Task<IActionResult> Approve(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();

            article.Status = "Approved";
            await _context.SaveChangesAsync();

            return Ok(article);
        }
    }
}