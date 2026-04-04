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
            return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
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
        public async Task UpdateAsync(CategoryEntity category)
        {
            var existing = await _context.Categories.FindAsync(category.Id);
            if (existing == null) throw new KeyNotFoundException("Категорія не знайдена");

            existing.Name = category.Name;

            if (!string.IsNullOrEmpty(category.Image))
            {
                existing.Image = category.Image;
            }

            await _context.SaveChangesAsync();
        }
    }
}