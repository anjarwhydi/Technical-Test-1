namespace API.ViewModels
{
    public class PenjualanVM
    {
        public int ProdukID { get; set; }
        public int Jumlah { get; set; }
        public decimal Total { get; set; }
        public DateTime TanggalPenjualan { get; set; }
    }
}
