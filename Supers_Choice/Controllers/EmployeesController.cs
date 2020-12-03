using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Supers_Choice.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supers_Choice.Data;

namespace Supers_Choice.Controllers
{
    [Route("api/employees")]
    [ApiController]
    public class EmployeesController : ControllerBase
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
    }
}
