using WEB_API.DAL.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WEB_API.DAL.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<CategoryEntity>> GetAllAsync();
    }
}