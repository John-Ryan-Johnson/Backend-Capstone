using System;

namespace Supers_Choice.Models
{
    public class MachineAssignment
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public int EmployeeId { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsRunning { get; set; }
        public DateTime Date { get; set; }
        public int DowntimeCodeId { get; set; }
        public int MachineDetailId { get; set; }
        public bool IsCompleted { get; set; }
    }
}
