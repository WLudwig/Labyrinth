using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace CS4540Final.Models
{
    public class IndexModel : PageModel
    {
        private readonly CS4540Final.Models.HighScoreDB _context;

        public IndexModel(CS4540Final.Models.HighScoreDB context)
        {
            _context = context;
        }

        public IList<HighScore> HighScore { get;set; }

        public async Task OnGetAsync()
        {
            HighScore = await _context.HighScore.ToListAsync();
        }
    }
}
