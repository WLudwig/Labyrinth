using CS4540Final.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CS4540Final.Data
{
    public class DbInitializer
    {

        public static void Initialize(HighScoreDB context)
        {
            context.Database.EnsureCreated();

            // Look for any students.
            if (context.HighScore.Any())
            {
                return;   // DB has been seeded
            }

            var HighScores = new HighScore[]
            {
                new HighScore{ Name = "Jacob", Time = 100},
                new HighScore{ Name = "Will", Time = 105}
            };
            foreach (HighScore h in HighScores)
            {
                context.HighScore.Add(h);
            }
            context.SaveChanges();
        }
    }
}
