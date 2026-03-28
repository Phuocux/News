using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Contracts
{
    public class CreateNewsRequest
    {
        [Required]
        [StringLength(1000)]
        public string Title { get; set; } = string.Empty;

        [StringLength(5000)]
        public string? Summary { get; set; }

        [StringLength(200000)]
        public string? Content { get; set; }

        public List<Guid>? TagIds { get; set; }

        public string? ThumbnailUrl { get; set; }
        
        [Required]
        public Guid AuthorId { get; set; }
    }
}