using API.Repository.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.Models;
using System.Collections.Generic;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdukController : ControllerBase
    {
        private readonly IProdukRepository repository;

        public ProdukController(IProdukRepository repository)
        {
            this.repository = repository;
        }

        private ActionResult HandleSuccess(object data)
        {
            return Ok(new { status = HttpStatusCode.OK, data = data });
        }

        [HttpGet]
        public ActionResult<IEnumerable<Produk>> Get()
        {
            var produk = repository.Get();

            if (produk == null)
            {
                return NoContent();
            }

            return HandleSuccess(produk);
        }

        [HttpGet("{id}")]
        public ActionResult<Produk> Get(int id)
        {
            var produk = repository.Get(id);

            if (produk == null)
            {
                return NotFound();
            }

            return HandleSuccess(produk);
        }

        [HttpPost]
        public ActionResult<Produk> Post(Produk produk)
        {
            repository.Insert(produk);
            return HandleSuccess(produk);
        }

        [HttpPut("{id}")]
        public ActionResult<Produk> Put(int id, Produk produk)
        {
            var result = repository.Update(id, produk);

            if (result == 0)
            {
                return NotFound();
            }

            return HandleSuccess(produk);
        }

        [HttpDelete("{id}")]
        public ActionResult<Produk> Delete(int id)
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
