using NewsAPI.Models;   
namespace NewsAPI.Services
{
public interface IJwtService
{
    string GenerateToken(NewsAPI.Models.User user);
}
}