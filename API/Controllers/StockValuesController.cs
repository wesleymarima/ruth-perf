using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockValuesController : ControllerBase
    {
        private readonly IStockValue _stockValue;

        public StockValuesController(IStockValue stockValue)
        {
            _stockValue = stockValue;
        }

        [HttpGet("get_all")]
        public IActionResult GetAll()
        {
            var response = this._stockValue.GetAll();
            return Ok(response);
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(int id)
        {
            var response = this._stockValue.GetStockValue(id);
            return Ok(response);
        }
    }
}
