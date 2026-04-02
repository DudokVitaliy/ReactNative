using Microsoft.EntityFrameworkCore;
using WEB_API.DAL.Entities;

namespace WEB_API.DAL.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryEntity>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<CategoryEntity> GetByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task CreateAsync(CategoryEntity category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(CategoryEntity category)
        {
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}