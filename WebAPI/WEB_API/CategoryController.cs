using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using WEB_API.BLL.Dtos.Category;
using WEB_API.BLL.Models;
using WEB_API.BLL.Services.Category;
using WEB_API.Models;

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
            var host = $"{Request.Scheme}://{Request.Host}";

            var result = categories.Select(c => new CategoryResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                ImageUrl = string.IsNullOrEmpty(c.Image) ? null : $"{host}/images/{c.Image}"
            }).ToList();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category == null)
                return NotFound();

            var host = $"{Request.Scheme}://{Request.Host}";
            var result = new CategoryResponseDto
            {
                Id = category.Id,
                Name = category.Name,
                ImageUrl = string.IsNullOrEmpty(category.Image) ? null : $"{host}/images/{category.Image}"
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CreateCategoryRequest request)
        {
            string fileName = null;

            if (request.CategoryImage != null)
            {
                var folder = Path.Combine(_env.ContentRootPath, "images");

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
            var host = $"{Request.Scheme}://{Request.Host}";

            var response = new CategoryResponseDto
            {
                Id = result.Id,
                Name = result.Name,
                ImageUrl = string.IsNullOrEmpty(result.Image) ? null : $"{host}/images/{result.Image}"
            };

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] UpdateCategoryRequest request)
        {
            var existing = await _categoryService.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            string? fileName = null;

            if (request.CategoryImage != null)
            {
                var folder = Path.Combine(_env.ContentRootPath, "images");

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                fileName = Guid.NewGuid() + Path.GetExtension(request.CategoryImage.FileName);
                var path = Path.Combine(folder, fileName);

                using var stream = new FileStream(path, FileMode.Create);
                await request.CategoryImage.CopyToAsync(stream);
            }

            var updateDto = new UpdateCategoryDto
            {
                Id = id,
                Name = request.Name,
                ImagePath = fileName
            };

            var updated = await _categoryService.UpdateAsync(updateDto);
            var host = $"{Request.Scheme}://{Request.Host}";

            var result = new CategoryResponseDto
            {
                Id = updated.Id,
                Name = updated.Name,
                ImageUrl = string.IsNullOrEmpty(updated.Image) ? null : $"{host}/images/{updated.Image}"
            };

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            if (category == null)
                return NotFound();

            await _categoryService.DeleteAsync(id);
            return Ok(new { success = true, id });
        }
    }
}