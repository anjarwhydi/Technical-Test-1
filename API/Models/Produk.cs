using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Produk")]
    public class Produk
    {
        public int ID { get; set; }
        public string? NamaProduk { get; set; }
        public decimal Harga { get; set; }
    }
}
