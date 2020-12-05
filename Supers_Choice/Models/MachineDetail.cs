using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supers_Choice.Models
{
    public class MachineDetail
    {
        public int Id { get; set; }
        public int machineId { get; set; }
        public string notes { get; set; }
        public decimal runtime { get; set; }
        public decimal downtime { get; set; }
    }
}
