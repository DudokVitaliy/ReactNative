using WEB_API.BLL.Dtos.Category;
using WEB_API.DAL.Entities;

namespace WEB_API.BLL.Services.Category
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<CategoryEntity>> GetAllCategoriesAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }

        public async Task<CategoryEntity> CreateAsync(CreateCategoryDto dto)
        {
            var category = new CategoryEntity
            {
                Name = dto.Name,
                Image = dto.ImagePath
            };

            await _categoryRepository.CreateAsync(category);

            return category;
        }

        public async Task<CategoryEntity> GetByIdAsync(int id)
        {
            return await _categoryRepository.GetByIdAsync(id);
        }

        public async Task DeleteAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null) return;

            await _categoryRepository.DeleteAsync(category);
        }
    }
}