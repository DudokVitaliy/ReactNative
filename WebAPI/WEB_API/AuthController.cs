using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WEB_API.BLL.Constants;
using WEB_API.BLL.Dtos.Auth;
using WEB_API.BLL.Services.Auth;
using WEB_API.BLL.Services.Storage;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController(UserManager<UserEntity> userManager,
    IJWTTokenService tokenService, RoleManager<RoleEntity> roleManager,
    IStorageService storage,
    IAuthService authService) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user == null)
            return Ok(new TokenDto());

        var isValidPassword = await userManager
            .CheckPasswordAsync(user, model.Password);
        if (!isValidPassword)
            return Ok(new TokenDto());

        user.IsDeleted = false;
        await userManager.UpdateAsync(user);
        var result = await tokenService.CreateTokenAsync(user);

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterDto model)
    {
        var user = new UserEntity()
        {
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            Image = await storage.SaveImageAsync(model.ImageFile),
            UserName = model.Email
        };
        var result = await userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, Roles.User);
            var tokenInfo = await tokenService.CreateTokenAsync(user);
            return Ok(tokenInfo);
        }
        else
        {
            Console.WriteLine("------ ERROR WHEN CREATING USER: ");
            return BadRequest(result.Errors);
        }

    }
}