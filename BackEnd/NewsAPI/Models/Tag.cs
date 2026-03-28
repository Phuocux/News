using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class Tag
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; } = "";

        public ICollection<NewsTag>? NewsTags { get; set; }
    }
}