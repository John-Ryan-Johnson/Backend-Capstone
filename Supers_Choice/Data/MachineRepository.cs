using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Supers_Choice.Models;

namespace Supers_Choice.Data
{
    public class MachineRepository
    {
        static List<Machine> _machines = new List<Machine>();

        const string _connectionString = "Server=localhost;Database=SupersChoice;Trusted_Connection=True;";

        public void Add(Machine machineToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Machines]
                               ([name]
                               ,[employeeId]
                               ,[isDeleted]
                               ,[isRunning]
                               ,[Date]
                                [downtimeCodeId])
                        Output inserted.id
                        VALUES
                               (@name,@employeeId,@isDeleted,@isRunning,@Date,@downtimeCodeId)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, machineToAdd);

            machineToAdd.Id = newId;
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

        public void Remove(int machineId)
        {
            var sql = @"DELETE 
                        FROM [dbo].[Machines]
                        WHERE Id = @id";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { id = machineId });
        }
    }
}
