using System;


namespace Supers_Choice.Models
{
    public class MachineInfo
    {
        public int MachineId { get; set; }
        public string  Name { get; set; }
        public Decimal Runtime { get; set; }
        public Decimal Downtime { get; set; }
        public string Notes { get; set; }
        public string CodeText { get; set; }
        public int EmployeeId { get; set; }
    }
}
