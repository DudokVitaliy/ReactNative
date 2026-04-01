using Microsoft.AspNetCore.Http;

namespace WEB_API.Models
{
    public class CreateCategoryRequest
    {
        public string Name { get; set; }
        public IFormFile CategoryImage { get; set; }
    }
}