using System.Collections.Generic;

namespace NewsAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // Một danh mục có nhiều bài viết
        public ICollection<Article> Articles { get; set; } = new List<Article>();
    }
}