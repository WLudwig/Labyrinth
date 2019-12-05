/* Authors: William Ludwig and Jacob Blomquist
 * Cs 4540: Web Software
 * 
 * Create a high score object
 * 
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CS4540Final.Models
{
    public class HighScore
    {
            public int HighScoreID { get; set; }
            public string Name { get; set; }
            public int Time { get; set; }
    }
}
