using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace CS4540Final.Models
{
    public class EditModel : PageModel
    {
        private readonly CS4540Final.Models.HighScoreDB _context;

        public EditModel(CS4540Final.Models.HighScoreDB context)
        {
            _context = context;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(HighScore).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HighScoreExists(HighScore.HighScoreID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool HighScoreExists(int id)
        {
            return _context.HighScore.Any(e => e.HighScoreID == id);
        }
    }
}
