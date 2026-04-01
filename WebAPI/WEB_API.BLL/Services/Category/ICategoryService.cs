using WEB_API.BLL.Dtos.Category;
using WEB_API.DAL.Entities;

namespace WEB_API.BLL.Services.Category
{
    public interface ICategoryService
    {
        Task<List<CategoryEntity>> GetAllCategoriesAsync();
        Task<CategoryEntity> CreateAsync(CreateCategoryDto dto);
    }
}