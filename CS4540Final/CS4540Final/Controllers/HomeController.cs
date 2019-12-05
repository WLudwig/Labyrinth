/* Author: William Ludwig and Jacob Blomquist
 * CS4540 Web Software
 * 
 * This is a Controller that holds the actions for all of
 * the views that are used on the web application.
 * 
 */

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CS4540Final.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace CS4540Final.Controllers
{
    public class HomeController : Controller
    {

        private readonly HighScoreDB context;


        public HomeController(HighScoreDB _context)
        {
            context = _context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize(Roles = "Player")]
        public async Task<IActionResult> HighScore()
        {
            return View(await context.HighScore.OrderBy(o => o.Time).ToListAsync());
        }

        [Authorize(Roles = "Administrator, Player")]
        public IActionResult Game()
        {
            return View();
        }

        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AdminHighScore()
        {
            return View(await context.HighScore.OrderBy(o => o.Time).ToListAsync());
        }

        [Authorize(Roles = "Player")]
        public IActionResult Rules()
        {
            return View();
        }

        [Authorize(Roles = "Player")]
        public IActionResult Contact()
        {
            return View();
        }

        [Authorize(Roles = "Player, Administrator")]
        [HttpPost]
        public JsonResult AddScore(int score)
        {

            try
            {
                context.HighScore.Add(new Models.HighScore { Name = User.Identity.Name, Time = score });
                context.SaveChanges();
            }
            catch (Exception e)
            {
                return Json(new { status = "Failed" });
            }
            return Json(new { status = "Success" });

        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var highscore = await context.HighScore.FirstOrDefaultAsync(m => m.HighScoreID == id);
            if (highscore == null)
            {
                return NotFound();
            }
            context.HighScore.Remove(highscore);
            await context.SaveChangesAsync();
            return RedirectToAction(nameof(AdminHighScore));
        }
    }
}
