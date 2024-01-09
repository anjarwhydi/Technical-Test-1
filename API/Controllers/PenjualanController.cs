using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.ViewModels;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PenjualanController : ControllerBase
    {
        private readonly IPenjualanRepository repository;

        public PenjualanController(IPenjualanRepository repository)
        {
            this.repository = repository;
        }

        private IActionResult HandleSuccess(object data)
        {
            return Ok(new { status = HttpStatusCode.OK, data = data });
        }

        [HttpGet]
        public IActionResult Get()
        {
            var penjualan = repository.Get();

            if (penjualan == null)
            {
                return NotFound();
            }

            return HandleSuccess(penjualan);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var penjualan = repository.Get(id);

            if (penjualan == null)
            {
                return NotFound();
            }

            return HandleSuccess(penjualan);
        }

        [HttpPost]
        public IActionResult Post(PenjualanVM penjualan)
        {
            repository.Insert(penjualan);
            return HandleSuccess(penjualan);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, PenjualanVM penjualan)
        {
            var result = repository.Update(id, penjualan);

            if (result == 0)
            {
                return NotFound();
            }

            return HandleSuccess(penjualan);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = repository.Delete(id);

            if (result == 0)
            {
                return NotFound();
            }

            return HandleSuccess(null);
        }
    }
}
