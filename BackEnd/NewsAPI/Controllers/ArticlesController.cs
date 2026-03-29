[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly NewsDbContext _context;

    public ArticlesController(NewsDbContext context) => _context = context;

    // ✅ Lấy danh sách: Trả về DTO để nhẹ băng thông và bảo mật
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _context.Articles
            .Include(a => a.Author)
            .Include(a => a.Category)
            .Select(a => new ArticleResponseDto {
                Id = a.Id,
                Title = a.Title,
                AuthorName = a.Author != null ? a.Author.Username : "Ẩn danh",
                CategoryName = a.Category != null ? a.Category.Name : "Chưa phân loại",
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();

        return Ok(result);
    }

    // ✅ Tạo bài viết: Tự động lấy ID người dùng từ JWT Token
    [HttpPost]
    [Authorize] // Bắt buộc phải đăng nhập mới được đăng bài
    public async Task<IActionResult> Create([FromBody] CreateArticleDto dto)
    {
        // 🛡️ Lấy UserId từ Claims của Token (Bảo mật tuyệt đối)
        var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim)) return Unauthorized("Không xác định được người dùng.");

        var article = new Article {
            Title = dto.Title,
            Content = dto.Content,
            ImageUrl = dto.ImageUrl,
            CategoryId = dto.CategoryId,
            AuthorId = int.Parse(userIdClaim), // Gán ID người đăng tự động
            CreatedAt = DateTime.Now,
            Status = "Pending", // Mặc định chờ duyệt
            Views = 0
        };

        _context.Articles.Add(article);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
    }

    // ✅ Cập nhật: Chỉ cho phép sửa Content/Title, không cho sửa AuthorId lung tung
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(int id, [FromBody] CreateArticleDto dto)
    {
        var article = await _context.Articles.FindAsync(id);
        if (article == null) return NotFound();

        // Kiểm tra quyền: Nếu không phải Admin thì chỉ được sửa bài của chính mình
        var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        if (article.AuthorId != userId && !User.IsInRole("Admin")) 
            return Forbid("Bạn không có quyền sửa bài này.");

        article.Title = dto.Title;
        article.Content = dto.Content;
        article.CategoryId = dto.CategoryId;
        article.ImageUrl = dto.ImageUrl;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Cập nhật thành công" });
    }
}