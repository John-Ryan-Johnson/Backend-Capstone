using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supers_Choice.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public bool isSupervisor { get; set; }
        public bool isManager { get; set; }
        public bool isDeleted { get; set; }
    }
}
