using API.Models;

namespace API.ViewModels
{
    public class GetPenjualanVM
    {
        public int ID { get; set; }
        public int ProdukID { get; set; }
        public string NamaProduk { get; set; }
        public int Jumlah { get; set; }
        public decimal Total { get; set; }
        public DateTime TanggalPenjualan { get; set; }
    }
}
