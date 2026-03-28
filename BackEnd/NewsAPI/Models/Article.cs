namespace NewsAPI.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; } // Pending, Approved, Rejected
        public int Views { get; set; }
        public DateTime CreatedAt { get; set; }




        public int CategoryId { get; set; } // Khóa ngoại
        public Category Category { get; set; } = default!;

        public int AuthorId { get; set; }
        public User Author { get; set; } = default!;
    }
}