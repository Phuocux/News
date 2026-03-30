namespace NewsAPI.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string Status { get; set; } // Pending, Approved, Rejected
        public int Views { get; set; }
        public DateTime CreatedAt { get; set; }




        public int CategoryId { get; set; } // Khóa ngoại
        public Category Category { get; set; } = default!;

        public int AuthorId { get; set; }
        public User Author { get; set; } = default!;
    }
}