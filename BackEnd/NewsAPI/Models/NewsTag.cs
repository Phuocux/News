using System.Text.Json.Serialization;
namespace NewsAPI.Models
{
    public class NewsTag
    {
        public Guid NewsId { get; set; }

[JsonIgnore]
    public News? News { get; set; }

        public Guid TagId { get; set; }

        public Tag? Tag { get; set; }
    }
}