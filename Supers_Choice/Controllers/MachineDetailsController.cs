using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supers_Choice.Data;
using Supers_Choice.Models;

namespace Supers_Choice.Controllers
{
    [Route("api/machineDetails")]
    [ApiController]
    public class MachineDetailsController : ControllerBase
    {
        MachineDetailRepository _repo;

        public MachineDetailsController()
        {
            _repo = new MachineDetailRepository();
        }

        [HttpGet]
        public IActionResult GetAllMachineDetails()
        {
            var allMachineDetails = _repo.GetAll();

            return Ok(allMachineDetails);
        }

        [HttpGet("{id}")]
        public IActionResult GetMachineDetailsById(int id)
        {
            var machineDetail = _repo.GetById(id);

            if (machineDetail == null) return NotFound("No machine details with that Id was found");

            return Ok(machineDetail);
        }

        [HttpPost]
        public IActionResult AddMachineDetail(MachineDetailWithDowntimeCode newObj)
        {
            var newMachineDetailId = _repo.AddMachineDetail(newObj);

            return Created($"/api/machineDetails/{newMachineDetailId}", newMachineDetailId);
        }
   
    }
}
