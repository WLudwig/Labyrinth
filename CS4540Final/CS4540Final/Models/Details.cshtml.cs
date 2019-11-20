using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace CS4540Final.Models
{
    public class DetailsModel : PageModel
    {
        private readonly CS4540Final.Models.HighScoreDB _context;

        public DetailsModel(CS4540Final.Models.HighScoreDB context)
        {
            _context = context;
        }

        public HighScore HighScore { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            HighScore = await _context.HighScore.FirstOrDefaultAsync(m => m.HighScoreID == id);

            if (HighScore == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
