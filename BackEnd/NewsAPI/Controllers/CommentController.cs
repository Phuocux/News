using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewsAPI.AppDataContext;
using Microsoft.AspNetCore.Authorization;
using NewsAPI.Models;


namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly NewsDbContext _context;

        public CommentsController(NewsDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(Comment comment)
        {
            comment.CreatedAt = DateTime.Now;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        [HttpGet("article/{articleId}")]
        public async Task<IActionResult> GetByArticle(int articleId)
        {
            var comments = await _context.Comments
                .Where(c => c.ArticleId == articleId)
                .ToListAsync();

            return Ok(comments);
        }
    }
}