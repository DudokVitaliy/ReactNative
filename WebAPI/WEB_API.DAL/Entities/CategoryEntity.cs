namespace WEB_API.DAL.Entities
{
    public class CategoryEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
    }
}