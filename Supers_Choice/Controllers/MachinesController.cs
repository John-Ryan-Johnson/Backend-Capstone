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
    [Route("api/machines")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        MachineRepository _repo;

        public MachinesController(MachineRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public IActionResult CreateMachine(Machine machine)
        {
            _repo.Add(machine);

            return Created($"/api/machines/{machine.Id}", machine);
        }

        [HttpGet]
        public IActionResult GetAllMachines()
        {
            var allMachines = _repo.GetAll();

            return Ok(allMachines);
        }

        [HttpGet("{id}")]
        public IActionResult GetMachineById(int id)
        {
            var machine = _repo.GetById(id);

            if (machine == null) return NotFound("No machine with that Id was found");

            return Ok(machine);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMachine(int id)
        {
            if (_repo.GetById(id) == null)
            {
                return NotFound();
            }

            _repo.Remove(id);

            return Ok();
        }

        [HttpGet("schedule/{employeeId}")]
        public IActionResult GetMachineByEmployeeId(int employeeId)
        {
            var machines = _repo.GetMachinesByEmployeeId(employeeId);

            if (machines == null) return NotFound("No machines found for this employee");

            return Ok(machines);
        }

        [HttpGet("info/{employeeId}")]
        public IActionResult GetAllMachineInfoByEmployeeId(int employeeId)
        {
            var machineInfo = _repo.GetSingleMachineAndInfoByEmployeeId(employeeId);

            if (machineInfo == null) return NotFound("No machine and info with that employeeId was found");

            return Ok(machineInfo);
        }
    }
}
