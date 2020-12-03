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

        public MachinesController()
        {
            _repo = new MachineRepository();
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
    }
}
