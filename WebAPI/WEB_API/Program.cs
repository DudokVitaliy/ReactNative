using Microsoft.EntityFrameworkCore;
using WEB_API.BLL.Services.Category;
using WEB_API.DAL;
using WEB_API.DAL.Entities;
using WEB_API.DAL.Repositories;

var builder = WebApplication.CreateBuilder(args);

// слухати на IP комп'ютера і HTTP
builder.WebHost.UseUrls("http://192.168.0.4:5268");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("CategoriesDB"));

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAll"); // підключаємо CORS

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Categories.Any())
    {
        db.Categories.AddRange(
            new CategoryEntity { Id = 1, Name = "Fantazy", ImageUrl = "https://cdn-ksvod.kyivstar.ua/content/HLS/VOD/IMAGE2/61c2efc3af14596160d8d034/IMAGE_2_3_XL.jpg" },
            new CategoryEntity { Id = 2, Name = "Adventure", ImageUrl = "https://www.romb-studio.com.ua/wp-content/uploads/2025/12/filmy-pro-podorozhi-v-chasi-z-vysokym-rejtynhom-top-21-filmiv.jpg" }
        );
        db.SaveChanges();
    }
}

app.UseSwagger();
app.UseSwaggerUI();

// app.UseHttpsRedirection(); // вимикаємо для локальної мережі
app.UseAuthorization();
app.MapControllers();

app.Run();