﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CS4540Final.Models;
using Microsoft.EntityFrameworkCore;

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
        /*
            public IActionResult void HighScore()
            {
                return View(await context.HighScore.ToListAsync());
            }
            */

        public async Task<IActionResult> HighScore()
        {
            return View(await context.HighScore.ToListAsync());
        }

        public IActionResult Rules()
        {
            return View();
        }

        public IActionResult Contact()
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
