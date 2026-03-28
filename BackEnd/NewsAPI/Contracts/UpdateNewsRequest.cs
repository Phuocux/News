using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Contracts
{
    public class UpdateNewsRequest
    {
        [StringLength(1000)]
        public string? Title { get; set; }

        [StringLength(5000)]
        public string? Summary { get; set; }

        [StringLength(200000)]
        public string? Content { get; set; }

        public string? ThumbnailUrl { get; set; }
        
        public Guid? AuthorId { get; set; }
    }
}