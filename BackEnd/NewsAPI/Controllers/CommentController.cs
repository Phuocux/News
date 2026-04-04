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
            var userId = int.Parse(User.FindFirst("Id")!.Value);

            comment.UserId = userId;
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
            .Join(_context.Users,
                comment => comment.UserId,
                user => user.Id,
                (comment, user) => new {
                    comment.Id,
                    comment.Content,
                    comment.CreatedAt,
                    username = user.Username
                })
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

        return Ok(comments);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Comment updatedComment)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return NotFound();

            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized("Token không hợp lệ");

            var userId = int.Parse(userIdClaim.Value);

            // ✅ chỉ chính chủ được sửa
            if (comment.UserId != userId)
                return Forbid();

            // update nội dung
            comment.Content = updatedComment.Content;

            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null) return NotFound();

            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
                return Unauthorized("Token không hợp lệ");

            var userId = int.Parse(userIdClaim.Value);

            // Check role với chính chủ và admin
            if (comment.UserId != userId && !User.IsInRole("Admin"))
                return Forbid();

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}