using WEB_API.DAL.Repositories;
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
    }
}