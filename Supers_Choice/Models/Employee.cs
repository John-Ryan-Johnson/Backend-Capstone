namespace Supers_Choice.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public bool isSupervisor { get; set; }
        public bool isDeleted { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
