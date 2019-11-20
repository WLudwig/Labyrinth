using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CS4540Final.Models
{
    public class HighScoreDB : DbContext
    {
        public HighScoreDB (DbContextOptions<HighScoreDB> options)
            : base(options)
        {
        }

        public DbSet<HighScore> HighScore { get; set; }
    }
}
