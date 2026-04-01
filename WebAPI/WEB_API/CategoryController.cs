using Microsoft.AspNetCore.Mvc;
using WEB_API.BLL.Services.Category;
using WEB_API.Models;
using WEB_API.BLL.Dtos.Category;

namespace WEB_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IWebHostEnvironment _env;

        public CategoryController(ICategoryService categoryService, IWebHostEnvironment env)
        {
            _categoryService = categoryService;
            _env = env;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();

            var host = $"{Request.Scheme}://{Request.Host}"; // http://192.168.0.4:5268

            var result = categories.Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                ImageUrl = string.IsNullOrEmpty(c.Image) ? null : $"{host}/uploads/{c.Image}"
            }).ToList();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCategoryRequest request)
        {
            string fileName = null;
            if (request.CategoryImage != null)
            {
                var folder = Path.Combine(_env.WebRootPath, "uploads");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                fileName = Guid.NewGuid() + Path.GetExtension(request.CategoryImage.FileName);

                var path = Path.Combine(folder, fileName);

                using var stream = new FileStream(path, FileMode.Create);
                await request.CategoryImage.CopyToAsync(stream);
            }

            var dto = new CreateCategoryDto
            {
                Name = request.Name,
                ImagePath = fileName
            };

            var result = await _categoryService.CreateAsync(dto);

            return Ok(result);
        }
    }
}