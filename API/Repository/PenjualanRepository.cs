using API.Context;
using API.Models;
using API.Repository.Interface;
using API.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace API.Repository
{
    public class PenjualanRepository : IPenjualanRepository
    {
        private readonly MyContext context;

        public PenjualanRepository(MyContext context)
        {
            this.context = context;
        }

        public IEnumerable<GetPenjualanVM> Get()
        {
            var result = (from e in context.Penjualan
                          join d in context.Produk on e.ProdukID equals d.ID
                          select new GetPenjualanVM
                          {
                              ID = e.ID,
                              ProdukID = e.ProdukID,
                              NamaProduk = d.NamaProduk,
                              Jumlah = e.Jumlah,
                              Total = e.Total,
                              TanggalPenjualan = e.TanggalPenjualan,
                          }).ToList();
            return result;
        }

        public GetPenjualanVM Get(int id)
        {
            var result = (from e in context.Penjualan
                          join d in context.Produk on e.ProdukID equals d.ID
                          where e.ID == id
                          select new GetPenjualanVM
                          {
                              ID = e.ID,
                              ProdukID = e.ProdukID,
                              NamaProduk = d.NamaProduk,
                              Jumlah = e.Jumlah,
                              Total = e.Total,
                              TanggalPenjualan = e.TanggalPenjualan,
                          }).SingleOrDefault();
            if(result == null)
            {
                return null;
            }
            return result;
        }

        public int Insert(PenjualanVM penjualan)
        {
            var product = context.Produk.SingleOrDefault(pr => pr.ID == penjualan.ProdukID);

            if (product == null)
            {
                return 0;
            }
            decimal totalPrice = product.Harga * penjualan.Jumlah;
            var newPenjualan = new Penjualan
            {
                ProdukID = penjualan.ProdukID,
                Jumlah = penjualan.Jumlah,
                Total = totalPrice,
                TanggalPenjualan = penjualan.TanggalPenjualan
            };
            context.Penjualan.Add(newPenjualan);
            return context.SaveChanges();
        }


        public int Update(int id, PenjualanVM penjualan)
        {
            var product = context.Produk.SingleOrDefault(pr => pr.ID == penjualan.ProdukID);
            if (product == null)
            {
                return 0;
            }
            decimal totalPrice = product.Harga * penjualan.Jumlah;
            var result = context.Penjualan.SingleOrDefault(x => x.ID == id);
            if (result == null)
            {
                return 0;
            }
            result.ProdukID = penjualan.ProdukID;
            result.Jumlah = penjualan.Jumlah;
            result.Total = totalPrice;
            result.TanggalPenjualan = penjualan.TanggalPenjualan;
            context.Entry(result).State = EntityState.Modified;
            return context.SaveChanges();
        }
        public int Delete(int id)
        {
            var result = context.Penjualan.SingleOrDefault(x => x.ID == id);
            if (result == null)
            {
                return 0;
            }
            context.Penjualan.Remove(result);
            return context.SaveChanges();
        }
    }
}
