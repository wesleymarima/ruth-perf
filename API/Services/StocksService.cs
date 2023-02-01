using API.Models;
using Newtonsoft.Json;

namespace API.Services
{
    public class StocksService : IStocks
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public StocksService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public List<Stocks> GetStocksAsync()
        {
            var rootPath = _webHostEnvironment.ContentRootPath;
            var fullPath = Path.Combine(rootPath, "data/stocks.json");
            var jsonData = System.IO.File.ReadAllText(fullPath);

            if (string.IsNullOrWhiteSpace(jsonData)) return null;

            var stocks = JsonConvert.DeserializeObject<List<Stocks>>(jsonData);

            return stocks;

        }

        public List<Stocks> Search(string query)
        {
            List<Stocks> stockItems = this.GetStocksAsync();

            var response = stockItems.Where(t => t.Stock.Contains(query)
                || t.Currency_Code.Contains(query)
                || t.Industry.Contains(query)
                || t.Sector.Contains(query))
                .ToList();
            return response;
        }
    }
}
