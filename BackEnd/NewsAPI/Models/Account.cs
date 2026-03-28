using System.ComponentModel.DataAnnotations;

namespace NewsAPI.Models
{
    public class Account
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "Journalist";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<News>? News { get; set; }
    }
}