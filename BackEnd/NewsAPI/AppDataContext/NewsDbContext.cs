using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NewsAPI.Models;

namespace NewsAPI.AppDataContext
{
    public class NewsDbContext : DbContext
{
    public NewsDbContext(DbContextOptions<NewsDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Article>()
            .HasOne(a => a.Category)
            .WithMany(c => c.Articles)
            .HasForeignKey(a => a.CategoryId);
    }
}
}