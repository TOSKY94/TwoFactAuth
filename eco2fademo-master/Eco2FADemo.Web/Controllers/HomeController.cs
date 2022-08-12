using Eco2FADemo.Web.Models;
using Google.Authenticator;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Eco2FADemo.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private const string KEY = "ecotestkey2022";

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Transfer()
        {
            return View();
        }

        public IActionResult Setup2FA()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Setup2FA(string username)
        {
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            SetupCode setupInfo = tfa.GenerateSetupCode("Ecobank", username, KEY+username, false, 3);

            string qrCodeImageUrl = setupInfo.QrCodeSetupImageUrl;
            string manualEntrySetupCode = setupInfo.ManualEntryKey;

            return Ok(new { Success = true, Message = "Success", Url = qrCodeImageUrl, Code = manualEntrySetupCode });
        }

        [HttpPost]
        public IActionResult Validate(string username, string token)
        {
            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            bool result = tfa.ValidateTwoFactorPIN(KEY + username, token);

            return Ok(new { Success = result, Message = result?"Success":"Invalid token!" });
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}