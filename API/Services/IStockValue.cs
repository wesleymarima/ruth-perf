using API.Models;

namespace API.Services
{
    public interface IStockValue
    {
        List<StockValue> GetAll();
        List<StockValue> GetStockValue(int StockId);
    }
}
