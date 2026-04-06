using WEB_API.BLL.Dtos.Auth;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Services.Auth;

public interface IJWTTokenService
{
    Task<TokenDto> CreateTokenAsync(UserEntity user);
}