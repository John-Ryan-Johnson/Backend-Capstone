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
    [Route("api/machineAssignments")]
    [ApiController]
    public class MachineAssignmentsController : ControllerBase
    {
        MachineAssignmentRepository _repo;

        public MachineAssignmentsController(MachineAssignmentRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public IActionResult CreateMachineAssignment(MachineAssignment machine)
        {
            _repo.AddEmployeeToMachine(machine);

            return Created($"/api/machineAssignments/{machine.Id}", machine);
        }

        [HttpGet]
        public IActionResult GetAllMachineAssignments()
        {
            var allMachineAssignments = _repo.GetAllMachineAssignments();

            return Ok(allMachineAssignments);
        }

        [HttpGet("{id}")]
        public IActionResult GetMachineAssignmentById(int id)
        {
            var machine = _repo.GetMachineAssignmentById(id);

            if (machine == null) return NotFound("No machine with that Id was found");

            return Ok(machine);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMachineAssignmentById(int id)
        {
            if (_repo.GetMachineAssignmentById(id) == null)
            {
                return NotFound();
            }

            _repo.RemoveMachineAssignmet(id);

            return Ok();
        }

        [HttpGet("history/{employeeId}")]
        public IActionResult GetMachineAssignmentByEmployeeId(int employeeId)
        {
            var machines = _repo.GetMachineAssignmentsByEmployeeId(employeeId);

            if (machines == null) return NotFound("No machines found for this employee");

            return Ok(machines);
        }

        [HttpGet("schedule/{employeeId}")]
        public IActionResult GetMachineAssignmentByEmployeeIdAndDate(int employeeId)
        {
            var machines = _repo.GetMachineAssignmentsByEmployeeIdAndCurrentDate(employeeId);

            if (machines == null) return NotFound("No machines found for this employee");

            return Ok(machines);
        }

        [HttpGet("info/{employeeId}/{machineId}/{machineAssignmentId}")]
        public IActionResult GetAllMachineInfoByEmployeeIdAndMachineId(int employeeId, int machineId, int machineAssignmentId)
        {
            var machineInfo = _repo.GetSingleMachineAssignmentInfoByEmployeeIdAndMachineIdAndMachineAssignmentId(employeeId, machineId, machineAssignmentId);

            if (machineInfo == null) return NotFound("No machine and info with that employeeId was found");

            return Ok(machineInfo);
        }

        [HttpGet("schedule/{employeeId}/{machineId}")]
        public IActionResult GetSingleMachineScheduleUsingEmployeeIdAndMachineId(int employeeId, int machineId)
        {
            var machineSchedule = _repo.GetSingleMachineAssignmentScheduleByEmployeeIdAndMachineId(employeeId, machineId);

            if (machineSchedule == null) return NotFound("No machine with that employeeId was found");

            return Ok(machineSchedule);
        }
    }
}
