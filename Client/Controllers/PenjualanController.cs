using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class PenjualanController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
