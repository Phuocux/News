namespace NewsAPI.Models
{       
public class Comment
{
    public int Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public int UserId { get; set; }
    public int ArticleId { get; set; }
    public DateTime CreatedAt { get; set; }
}
}