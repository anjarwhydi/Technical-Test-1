using API.Context;
using API.Models;
using API.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class ProdukRepository : IProdukRepository
    {
        private readonly MyContext context;

        public ProdukRepository(MyContext context)
        {
            this.context = context;
        }

        public IEnumerable<Produk> Get()
        {
            return context.Produk.ToList();
        }

        public Produk Get(int id)
        {
            var result = context.Produk.SingleOrDefault(x => x.ID == id);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        public int Insert(Produk produk)
        {
            context.Produk.Add(produk);
            return context.SaveChanges();
        }

        public int Update(int id, Produk produk)
        {
            var result = context.Produk.SingleOrDefault(x => x.ID == id);
            if (result == null)
            {
                return 0;
            }
            result.NamaProduk = produk.NamaProduk;
            result.Harga = produk.Harga;
            context.Entry(result).State = EntityState.Modified;
            return context.SaveChanges();
        }

        public int Delete(int id)
        {
            var result = context.Produk.SingleOrDefault(x => x.ID == id);
            if (result == null)
            {
                return 0;
            }
            context.Produk.Remove(result);
            return context.SaveChanges();
        }
    }
}
