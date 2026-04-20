using Microsoft.AspNetCore.Http;

namespace WEB_API.BLL.Services.Storage;

public interface IStorageService
{
    Task<string> SaveImageAsync(byte[] bytes);

    Task<string?> SaveImageAsync(IFormFile file);
    Task<string?> SaveImageAsync(string url);

    Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<IFormFile> files);
    Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<string> urls);

    Task DeleteImageAsync(string imageName);
}