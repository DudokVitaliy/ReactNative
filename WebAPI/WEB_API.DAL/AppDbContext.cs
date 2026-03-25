using Microsoft.EntityFrameworkCore;
using WEB_API.DAL.Entities;

namespace WEB_API.DAL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<CategoryEntity> Categories { get; set; }
    }
}