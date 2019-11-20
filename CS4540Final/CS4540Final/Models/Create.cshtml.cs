using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace CS4540Final.Models
{
    public class CreateModel : PageModel
    {
        private readonly CS4540Final.Models.HighScoreDB _context;

        public CreateModel(CS4540Final.Models.HighScoreDB context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public HighScore HighScore { get; set; }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.HighScore.Add(HighScore);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}