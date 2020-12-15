using System;


namespace Supers_Choice.Models
{
    public class MachineInfo
    {
        public int MachineId { get; set; }
        public string  Name { get; set; }
        public DateTime Date { get; set; }
        public Decimal Runtime { get; set; }
        public Decimal Downtime { get; set; }
        public string Notes { get; set; }
        public string Codes { get; set; }
        public int EmployeeId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
    }
}
