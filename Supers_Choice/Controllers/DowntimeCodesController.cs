using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Supers_Choice.Data;

namespace Supers_Choice.Controllers
{
    [Route("api/downtimeCodes")]
    [ApiController]
    public class DowntimeCodesController : ControllerBase
    {
        DowntimeCodeRepository _repo;

        public DowntimeCodesController()
        {
            _repo = new DowntimeCodeRepository();
        }

        [HttpGet]
        public IActionResult GetAllDowntimeCodes()
        {
            var allDowntimeCodes = _repo.GetAll();

            return Ok(allDowntimeCodes);
        }

        [HttpGet("{id}")]
        public IActionResult GetDowntimeCodeById(int id)
        {
            var downtimeCode = _repo.GetById(id);

            if (downtimeCode == null) return NotFound("No downtime code with that Id was found");

            return Ok(downtimeCode);
        }
    }
}
