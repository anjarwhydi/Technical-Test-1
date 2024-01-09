using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Penjualan")]
    public class Penjualan
    {
        public int ID { get; set; }
        public int ProdukID { get; set; }
        public int Jumlah { get; set; }
        public decimal Total { get; set; }
        public DateTime TanggalPenjualan { get; set; }
        public Produk? Produk { get; set; }
    }
}
