using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NewsAPI.AppDataContext;
using NewsAPI.Contracts;
using NewsAPI.Interface;
using NewsAPI.Models;

namespace NewsAPI.Services
{
    public class NewsServices : INewsServices
    {
        private readonly NewsDbContext _context;
        private readonly ILogger<NewsServices> _logger;
        private readonly IMapper _mapper;

        public NewsServices(
            NewsDbContext context,
            ILogger<NewsServices> logger,
            IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

       public async Task<IEnumerable<News>> GetAllAsync(Guid? tag)
        {
            var query = _context.News
                .Include(n => n.NewsTags)
                .AsQueryable();

            if (tag.HasValue)
            {
                query = query.Where(n =>
                    n.NewsTags != null &&
                    n.NewsTags.Any(nt => nt.TagId == tag));
            }

            return await query.ToListAsync();
        }

        public async Task<News> GetByIdAsync(Guid id)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
                throw new Exception($"News item with id {id} not found");

            return news;
        }

        public async Task CreateNewsAsync(CreateNewsRequest request)
            {
                var news = new News
                {
                    Id = Guid.NewGuid(),
                    Title = request.Title,
                    Summary = request.Summary,
                    Content = request.Content,
                    AuthorId = request.AuthorId,
                    ThumbnailUrl = request.ThumbnailUrl,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now
                };

                _context.News.Add(news);

                // thêm tag cho bài viết
                if (request.TagIds != null)
                {
                    foreach (var tagId in request.TagIds)
                    {
                        _context.NewsTags.Add(new NewsTag
                        {
                            NewsId = news.Id,
                            TagId = tagId
                        });
                    }
                }

                await _context.SaveChangesAsync();
            }

        public async Task UpdateNewsAsync(Guid id, UpdateNewsRequest request)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
                throw new Exception($"News item with id {id} not found");

            if (!string.IsNullOrEmpty(request.Title))
                news.Title = request.Title;

            if (request.Summary != null)
                news.Summary = request.Summary;

            if (request.Content != null)
                news.Content = request.Content;

            if (request.ThumbnailUrl != null)
        news.ThumbnailUrl = request.ThumbnailUrl;
        
           if (request.AuthorId.HasValue)
                news.AuthorId = request.AuthorId.Value;

            news.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteNewsAsync(Guid id)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
                throw new Exception($"News item with id {id} not found");

            _context.News.Remove(news);

            await _context.SaveChangesAsync();
        }
    }
}