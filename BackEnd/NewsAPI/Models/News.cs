using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewsAPI.Models
{
    public class News
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(1000)]
        public string Title { get; set; } = string.Empty;

        [StringLength(5000)]
        public string? Summary { get; set; }

        [StringLength(200000)]
        public string? Content { get; set; }

        public ICollection<NewsTag>? NewsTags { get; set; }
// Thumbnail
        [StringLength(2000)]
        public string? ThumbnailUrl { get; set; }
        
        public Guid AuthorId { get; set; }

        [ForeignKey("AuthorId")]
        public Account? Author { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }
}