using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Supers_Choice.Data;
using Supers_Choice.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace Supers_Choice.Controllers
{
    public abstract class FirebaseEnabledController : ControllerBase
    {
        protected string UserId => User.FindFirst(x => x.Type == "user_id").Value;
    }

    [Route("api/employees")]
    [ApiController]
    
    public class EmployeesController : FirebaseEnabledController
    {
        EmployeeRepository _repo;

        public EmployeesController(EmployeeRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public IActionResult CreateEmployee(Employee employee)
        {
            _repo.Add(employee);

            return Created($"/api/employees/{employee.Id}", employee);
        }

        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var allEmployees = _repo.GetAll();

            return Ok(allEmployees);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _repo.GetById(id);

            if (employee == null) return NotFound("No employee with that Id was found");

            return Ok(employee);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            if (_repo.GetById(id) == null)
            {
                return NotFound();
            }

            _repo.Remove(id);

            return Ok();
        }

        [HttpGet("uid")]
        public IActionResult GetEmployeeByUid()
        {
            var employee = _repo.GetByUid(UserId);

            if (employee == null) return NotFound("No employee with that uid was found");

            return Ok(employee);
        }
    }
}
