using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WEB_API.DAL.Entities;

namespace WEB_API.DAL.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        // Конструктор для DI
        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        // Реалізація методу з інтерфейсу
        public async Task<List<CategoryEntity>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}