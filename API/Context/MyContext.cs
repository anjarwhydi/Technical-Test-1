using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Produk> Produk { get; set; }
        public DbSet<Penjualan> Penjualan { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Penjualan>()
                .HasOne(p => p.Produk)
                .WithMany()
                .HasForeignKey(p => p.ProdukID);

            base.OnModelCreating(modelBuilder);
        }
    }


}
