using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supers_Choice.Models
{
    public class MachineDetail
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public string Notes { get; set; }
        public decimal Runtime { get; set; }
        public decimal Downtime { get; set; }
    }
}
