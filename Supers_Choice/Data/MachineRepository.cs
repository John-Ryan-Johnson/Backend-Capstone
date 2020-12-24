using System.Collections.Generic;
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
                               ,[downtimeCodeId]
                               ,[machineDetailId]
                               ,[isComplete])
                        Output inserted.id
                        VALUES
                               (@name,@employeeId,@isDeleted,@isRunning,@Date,@downtimeCodeId,@machineDetailId,@isComplete)";

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
                                                where employeeId = @eid
                                                and Date != convert(varchar(10), getdate(), 101)", parameters);

            return machines.ToList();
        }

        public List<Machine> GetMachinesByEmployeeIdAndCurrentDate(int employeeId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { eid = employeeId };

            var machines = db.Query<Machine>(@"select *
                                                from Machines
                                                where employeeId = @eid
                                                and Date = convert(varchar(10), getdate(), 101)", parameters);

            return machines.ToList();
        }

        public MachineInfo GetSingleMachineAndInfoByEmployeeIdAndMachineId(int employeeId, int machineId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select m.Id as [MachineId], m.name as [Name], m.Date AS [Date], md.runtime as [Runtime], md.downtime as [Downtime], md.notes as [Notes], dc.codeText as [Codes], e.Id as [EmployeeId], e.firstName as [Firstname], e.lastName as [Lastname]  
                            from Machines m
                            join MachineDetails md on md.Id = m.machineDetailId
                            join DowntimeCodes dc on dc.Id = m.downtimeCodeId
                            join Employees e on e.Id = m.employeeId
                            where e.Id = @eid
                            and m.Id = @mid";

            var parameters = new { eid = employeeId, mid = machineId};

            var info = db.QueryFirstOrDefault<MachineInfo>(query, parameters);

            return info;
        }

        public MachineSchedule GetSingleMachineByEmployeeIdAndMachineId(int employeeId, int machineId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select m.Id as [machineId], m.name as [Name], m.Date AS [Date], e.Id as [employeeId], e.firstName as [Firstname], e.lastName as [Lastname]
                            from Machines m
                            join Employees e
                            on m.employeeId = e.Id
                            Where e.Id = @eid
                            And m.Id = @mid
                            And Date = convert(varchar(10), getdate(), 101)";

            var parameters = new { eid = employeeId, mid = machineId };

            var schedule = db.QueryFirstOrDefault<MachineSchedule>(query, parameters);

            return schedule;
        }
    }
}
