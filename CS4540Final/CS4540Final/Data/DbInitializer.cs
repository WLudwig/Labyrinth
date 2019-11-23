using CS4540Final.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CS4540Final.Data
{
    public class DbInitializer
    {

        public static void Initialize(HighScoreDB context, UsersDB context2)
        {
            context.Database.Migrate();
            context2.Database.Migrate();

            // Look for any students.
            if (context.HighScore.Any() && context2.Users.Any())
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

            
            var users = new IdentityUser[]
            {
            new IdentityUser{Id="3fdddb37-1548-4726-b1d4-8f3fb7580942", UserName = "williampludwig@gmail.com",  NormalizedUserName="WILLIAMPLUDWIG@GMAIL.COM", Email="williampludwig@gmail.com", NormalizedEmail="WILLIAMPLUDWIG@GMAIL.COM", EmailConfirmed=false, PasswordHash="AQAAAAEAACcQAAAAEAeN+EuIMekyWkqmsl5vtNbiQsP3LSiOTHpOvUXRke/RsBrH1vxYuwH7GcLVUvK69Q==", SecurityStamp="H6M33BGGPP7G6GEPYVDPISLHYKTONGZN" },
            new IdentityUser{Id="c8cd7a43-fb71-4002-97c7-32e1c2d2e633", UserName = "wludwig@q.com", NormalizedUserName="WLUDWIG@Q.COM", Email="wludwig@q.com", NormalizedEmail="WLUDWIG@Q.COM", EmailConfirmed=false, PasswordHash="AQAAAAEAACcQAAAAEFfc1UJiJjwEHXMmbeS/X4RmCsZmx9G6wFPitSLQA4TsUZL2aCM0pYimeGZ8M0XPEw==", SecurityStamp="DWHWZE2KD2A2UVTJCBYTGBL5K5NBAF3J"},
            new IdentityUser{Id="d3bc71de-0287-417e-b90a-4e82bca20a6b", UserName = "jacobrb95@gmail.com", NormalizedUserName="JACOBRB95@GMAIL.COM", Email="jacobrb95@gmail.com", NormalizedEmail="JACOBRB95@GMAIL.COM", EmailConfirmed=false, PasswordHash="AQAAAAEAACcQAAAAEPPzCm5UHurCpTpKvhQ8zDweusg14L6YpgFWpxkookfPzP/M+Gesc+gVj4eM6TrA7Q==", SecurityStamp="AXA47QHWXEDDUZFOLG2LCT3PSNNY4Y2V"}
            };

            foreach (IdentityUser u in users)
            {
                context2.Users.Add(u);
            }
            context2.SaveChanges();

            var roles = new IdentityRole[]
            {
            new IdentityRole{ Id="1", Name="Administrator", NormalizedName="ADMINISTRATOR"},
            new IdentityRole{ Id="2", Name="Player", NormalizedName="PLAYER"},
            };
            foreach (IdentityRole r in roles)
            {
                context2.Roles.Add(r);
            }
            context2.SaveChanges();

            var userRoles = new IdentityUserRole<string>[]
            {
            new IdentityUserRole<string>{ UserId="3fdddb37-1548-4726-b1d4-8f3fb7580942", RoleId="2"},
            new IdentityUserRole<string>{ UserId="c8cd7a43-fb71-4002-97c7-32e1c2d2e633", RoleId="1"},
            new IdentityUserRole<string>{ UserId="d3bc71de-0287-417e-b90a-4e82bca20a6b", RoleId="2"}
            };
            foreach (IdentityUserRole<string> r in userRoles)
            {
                context2.UserRoles.Add(r);
            }
            context2.SaveChanges();
        }

    }
}

