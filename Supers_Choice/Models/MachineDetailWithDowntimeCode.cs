using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supers_Choice.Models
{
    public class MachineDetailWithDowntimeCode
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public string Notes { get; set; }
        public decimal Runtime { get; set; }
        public decimal Downtime { get; set; }
        public int DowntimeCode { get; set; }
        public int MachineAssignmentId { get; set; }
    }
}
