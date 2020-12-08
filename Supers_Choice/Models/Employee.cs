namespace Supers_Choice.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsSupervisor { get; set; }
        public bool IsDeleted { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
