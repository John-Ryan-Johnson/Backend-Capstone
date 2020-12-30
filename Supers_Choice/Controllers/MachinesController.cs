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
    }
}
