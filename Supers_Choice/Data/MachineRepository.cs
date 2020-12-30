using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Supers_Choice.Models;
using System.Collections.Generic;
using System.Linq;

namespace Supers_Choice.Data
{
    public class MachineRepository
    {
        readonly string _connectionString;
        public MachineRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SupersChoice");
        }

        public List<Machine> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var machines = db.Query<Machine>("select * from machines");

            return machines.ToList();
        }

        public Machine GetById(int machineId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Machines
                          where id = @mid";

            var parameters = new { mid = machineId };

            var machine = db.QueryFirstOrDefault<Machine>(query, parameters);

            return machine;
        }
    }
}
