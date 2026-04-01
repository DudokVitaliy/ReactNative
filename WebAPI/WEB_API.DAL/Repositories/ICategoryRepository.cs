using System.Collections.Generic;
using System.Threading.Tasks;
using WEB_API.DAL.Entities;

namespace WEB_API.DAL.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<CategoryEntity>> GetAllAsync();
        Task CreateAsync(CategoryEntity category);
    }
}