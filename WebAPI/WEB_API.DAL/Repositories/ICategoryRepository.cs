using WEB_API.DAL.Entities;

public interface ICategoryRepository
{
    Task<List<CategoryEntity>> GetAllAsync();
    Task<CategoryEntity> GetByIdAsync(int id);
    Task CreateAsync(CategoryEntity category);
    Task UpdateAsync(CategoryEntity category);
    Task DeleteAsync(CategoryEntity category);
}