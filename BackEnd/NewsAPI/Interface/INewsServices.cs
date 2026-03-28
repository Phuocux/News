using NewsAPI.Contracts;
using NewsAPI.Models;

namespace NewsAPI.Interface
{
     public interface INewsServices
     {
         Task<IEnumerable<News>> GetAllAsync(Guid? tag);
         Task<News> GetByIdAsync(Guid id);
         Task CreateNewsAsync(CreateNewsRequest request);
         Task UpdateNewsAsync(Guid id, UpdateNewsRequest request);
         Task DeleteNewsAsync(Guid id);
     }
}
