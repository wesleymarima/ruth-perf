using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly IStocks _stocks;

        public StocksController(IStocks stocks)
        {
            _stocks = stocks;
        }


        [HttpGet("all")]
        public List<Stocks> GetAll()
        {
            var response = this._stocks.GetStocksAsync();
            return response;
        }

        [HttpGet("search/{query}")]
        public IActionResult SearchStocks(string query)
        {
            var response = this._stocks.Search(query);

            return Ok(response);
        }
    }
}
