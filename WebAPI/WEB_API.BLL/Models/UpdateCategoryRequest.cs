using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace WEB_API.BLL.Models
{
    public class UpdateCategoryRequest
    {
        public string Name { get; set; } = null!;
        public IFormFile? CategoryImage { get; set; }
    }
}
