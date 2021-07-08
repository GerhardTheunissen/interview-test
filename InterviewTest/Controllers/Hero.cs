using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InterviewTest.Controllers
{
    public class Hero : IHero
    {
        public string name { get; set; }
        public string power { get; set; }
        public List<KeyValuePair<string, int>> stats {get;set;}
        public void evolve(int statIncrease = 5)
        {
            //The evolve method on the class should increment all stats of the hero with a multiple of half the original stat value.
            var tempStats = new List<KeyValuePair<string, int>>();
            foreach (var stat in this.stats)
            {
                int newValue = stat.Value;
                newValue += newValue / 2;
                tempStats.Add(new KeyValuePair<string, int>(stat.Key, newValue));
            }
            //Remove old stats
            stats.Clear();
            //Assign the new calculated stats
            stats = tempStats;
        }
    }

 
}
