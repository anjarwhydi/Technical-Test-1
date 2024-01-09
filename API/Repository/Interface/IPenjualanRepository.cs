using API.Models;
using API.ViewModels;

namespace API.Repository.Interface
{
    public interface IPenjualanRepository
    {
        IEnumerable<GetPenjualanVM> Get();
        GetPenjualanVM Get(int id);
        int Insert(PenjualanVM penjualan);
        int Update(int id, PenjualanVM penjualan);
        int Delete(int id);
    }
}
