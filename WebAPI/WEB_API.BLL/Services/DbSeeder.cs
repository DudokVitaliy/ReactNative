using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Linq.Expressions;
using WEB_API.BLL.Constants;
using WEB_API.BLL.Dtos.User;
using WEB_API.BLL.Services.Storage;
using WEB_API.DAL;
using WEB_API.DAL.Entities.Identity;
using WEB_API.DAL.Entities; // <-- припускаємо, що тут CategoryEntity

namespace WEB_API.BLL.Services;

public static class DbSeeder
{
    public static async Task SeedDataAsync(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
        var storage = scope.ServiceProvider.GetRequiredService<IStorageService>();

        context.Database.Migrate();

        // --- Seed Roles ---
        if (!roleManager.Roles.Any())
        {
            var roles = Roles.AllRoles.Select(x => new RoleEntity(x)).ToList();
            foreach (var role in roles)
            {
                var result = await roleManager.CreateAsync(role);
                if (!result.Succeeded)
                {
                    Console.WriteLine("---Error create Role {0}---", role.Name);
                }
            }
        }

        // --- Seed Users ---
        if (!userManager.Users.Any())
        {
            var json = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Users.json"));
            var users = JsonConvert.DeserializeObject<List<SeedUserDTO>>(json);
            if (users == null)
            {
                Console.WriteLine("------ JSON FILE NOT FOUND ----------");
            }
            else
            {
                foreach (var user in users)
                {
                    var newUser = new UserEntity()
                    {
                        Email = user.Email,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Image = await storage.SaveImageAsync(user.Image),
                        UserName = user.Email
                    };

                    var result = await userManager.CreateAsync(newUser, user.Password);
                    if (result.Succeeded)
                    {
                        await userManager.AddToRolesAsync(newUser, user.Roles);
                    }
                    else
                    {
                        Console.WriteLine("------ ERROR WHEN CREATING USER: ");
                        foreach (var error in result.Errors)
                        {
                            Console.WriteLine(error.Description);
                        }
                    }
                }
            }
        }

        // --- Seed Categories ---
        if (!context.Categories.Any())
        {
            var json = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "categories.json"));
            var categories = JsonConvert.DeserializeObject<List<CategorySeedDTO>>(json);

            if (categories == null)
            {
                Console.WriteLine("------ CATEGORIES JSON FILE NOT FOUND ----------");
            }
            else
            {
                foreach (var category in categories)
                {
                    var newCategory = new CategoryEntity()
                    {
                        Name = category.Name,
                        Image = await storage.SaveImageAsync(category.Image)
                    };

                    await context.Categories.AddAsync(newCategory);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}

public class CategorySeedDTO
{
    public string Name { get; set; }
    public string Image { get; set; }
}