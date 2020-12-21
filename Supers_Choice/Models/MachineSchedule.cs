using System;


namespace Supers_Choice.Models
{
    public class MachineSchedule
    {
        public int MachineId { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int EmployeeId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}
