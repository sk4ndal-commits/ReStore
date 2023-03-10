using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{

    // Need this class to tell Entity Framework how to store the Product's
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        // Products - name of table
        public DbSet<Product> Products { get; set; }
        
        public DbSet<Basket> Baskets { get; set; }
    }
}