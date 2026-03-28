using Microsoft.AspNetCore.Mvc;
using NewsAPI.Contracts;
using NewsAPI.Interface;

namespace NewsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly INewsServices _newsServices;

        public NewsController(INewsServices newsServices)
        {
            _newsServices = newsServices;
        }

        // CREATE NEWS
        [HttpPost]
        public async Task<IActionResult> CreateNewsAsync(CreateNewsRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _newsServices.CreateNewsAsync(request);

                return Ok(new
                {
                    message = "News created successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error while creating news",
                    error = ex.Message
                });
            }
        }

        // GET ALL NEWS (filter by tag)
        [HttpGet]
        public async Task<IActionResult> GetAllAsync([FromQuery] Guid? tag)
        {
            try
            {
                var news = await _newsServices.GetAllAsync(tag);

                return Ok(new
                {
                    message = "Successfully retrieved news",
                    data = news
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error while retrieving news",
                    error = ex.Message
                });
            }
        }

        // GET NEWS BY ID
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            try
            {
                var news = await _newsServices.GetByIdAsync(id);

                return Ok(new
                {
                    message = "Successfully retrieved news",
                    data = news
                });
            }
            catch (Exception ex)
            {
                return NotFound(new
                {
                    message = ex.Message
                });
            }
        }

        // UPDATE NEWS
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateNewsAsync(Guid id, UpdateNewsRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _newsServices.UpdateNewsAsync(id, request);

                return Ok(new
                {
                    message = "News updated successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error while updating news",
                    error = ex.Message
                });
            }
        }

        // DELETE NEWS
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteNewsAsync(Guid id)
        {
            try
            {
                await _newsServices.DeleteNewsAsync(id);

                return Ok(new
                {
                    message = "News deleted successfully"
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error while deleting news",
                    error = ex.Message
                });
            }
        }
    }
}