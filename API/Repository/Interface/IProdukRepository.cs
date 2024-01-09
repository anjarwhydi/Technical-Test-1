using API.Models;

namespace API.Repository.Interface
{
    public interface IProdukRepository
    {
        IEnumerable<Produk> Get();
        Produk Get(int id);
        int Insert(Produk produk);
        int Update(int id, Produk produk);
        int Delete(int id);
    }
}
