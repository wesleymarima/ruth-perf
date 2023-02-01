using API.Models;
using Newtonsoft.Json;

namespace API.Services
{
    public class StockValueService : IStockValue
    {

        private readonly IWebHostEnvironment _webHostEnvironment;


        public StockValueService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public List<StockValue> GetAll()
        {
            var rootPath = _webHostEnvironment.ContentRootPath;
            var fullPath = Path.Combine(rootPath, "data/Stock Values.json");
            var jsonData = System.IO.File.ReadAllText(fullPath);
            if (string.IsNullOrWhiteSpace(jsonData)) return null;

            var stockValues = JsonConvert.DeserializeObject<List<StockValue>>(jsonData);
            return stockValues;
        }

        public List<StockValue> GetStockValue(int StockId)
        {
            List<StockValue> stockValues = GetAll();

            var item = stockValues.Where(t => t.Stock_Id == StockId).ToList();

            return item;
        }
    }
}
