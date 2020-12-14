﻿using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Supers_Choice.Models;

namespace Supers_Choice.Data
{
    public class MachineRepository
    {
        readonly string _connectionString;
        public MachineRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SupersChoice");
        }

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

        public List<Machine> GetMachinesByEmployeeId(int employeeId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { eid = employeeId };

            var machines = db.Query<Machine>(@"select *
                                            from Machines
                                            where employeeId = @eid", parameters);

            return machines.ToList();
        }

        public List<MachineInfo> GetSingleMachineAndInfoByEmployeeId(int employeeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select m.Id as [MachineId], m.name as [Name], md.runtime as [Runtime], md.downtime as [Downtime], md.notes as [Notes], dc.codeText as [Codes], e.Id as [EmployeeId]  
                            from Machines m
                            join MachineDetails md on md.Id = m.machineDetailId
                            join DowntimeCodes dc on dc.Id = m.downtimeCodeId
                            join Employees e on e.Id = m.employeeId
                            where e.Id = @eid";

            var parameters = new { eid = employeeId };

            var info = db.Query<MachineInfo>(query, parameters).ToList();

            return info;
        }
    }
}
