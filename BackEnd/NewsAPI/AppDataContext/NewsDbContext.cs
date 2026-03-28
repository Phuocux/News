using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using NewsAPI.Models;

namespace NewsAPI.AppDataContext
{
    public class NewsDbContext : DbContext
    {
        private readonly DbSettings _dbsettings;

        public NewsDbContext(IOptions<DbSettings> dbSettings)
        {
            _dbsettings = dbSettings.Value;
        }

        public DbSet<News> News { get; set; }

        public DbSet<Account> Accounts { get; set; }

         public DbSet<User> Users { get; set; }

        public DbSet<Article> Articles { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Tag> Tags { get; set; }
        public DbSet<NewsTag> NewsTags { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_dbsettings.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<News>()
                .ToTable("News")
                .HasKey(n => n.Id);
            modelBuilder.Entity<NewsTag>()
                .HasKey(nt => new { nt.NewsId, nt.TagId });

            modelBuilder.Entity<NewsTag>()
                .HasOne(nt => nt.News)
                .WithMany(n => n.NewsTags)
                .HasForeignKey(nt => nt.NewsId);

            modelBuilder.Entity<NewsTag>()
                .HasOne(nt => nt.Tag)
                .WithMany(t => t.NewsTags)
                .HasForeignKey(nt => nt.TagId);
            modelBuilder.Entity<Article>()
                .HasOne(a => a.Category)
                .WithMany(c => c.Articles)
                .HasForeignKey(a => a.CategoryId);
        }
    }
}