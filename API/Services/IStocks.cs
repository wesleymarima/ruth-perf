using API.Models;

namespace API.Services
{
    public interface IStocks
    {
        List<Stocks> GetStocksAsync();

        List<Stocks> Search(string query);
    }
}
