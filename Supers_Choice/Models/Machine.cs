using System;

namespace Supers_Choice.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public string name { get; set; }
        public int employeeId { get; set; }
        public bool isDeleted { get; set; }
        public bool isRunning { get; set; }
        public DateTime Date { get; set; }
        public int downtimeCodeId { get; set; }
        public int machineDetailId { get; set; }
    }
}
