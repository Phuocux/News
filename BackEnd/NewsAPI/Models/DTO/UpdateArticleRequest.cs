using NewsAPI.Models;

namespace NewsAPI.Models
{
    public class UpdateArticleRequest
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ImageUrl { get; set; }
        public int? CategoryId { get; set; }
    }
}