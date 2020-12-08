using System;

namespace Supers_Choice.Models
{
    public class Machine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int EmployeeId { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsRunning { get; set; }
        public DateTime Date { get; set; }
        public int DowntimeCodeId { get; set; }
        public int MachineDetailId { get; set; }
    }
}
