﻿using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Supers_Choice.Models;
using static Supers_Choice.Models.MachineInfo;

namespace Supers_Choice.Data
{
    public class MachineAssignmentRepository
    {
        readonly string _connectionString;
        public MachineAssignmentRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SupersChoice");
        }

        public void AddEmployeeToMachine(MachineAssignment employeeToAdd)
        {
            var sql = @"INSERT INTO [dbo].[MachineAssignments]
                               ([machineId]
                               ,[employeeId]
                               ,[isDeleted]
                               ,[isRunning]
                               ,[Date]
                               ,[downtimeCodeId]
                               ,[machineDetailId])
                        Output inserted.id
                        VALUES
                               (@machineId,@employeeId,@isDeleted,@isRunning,@Date,@downtimeCodeId,@machineDetailId)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, employeeToAdd);

            employeeToAdd.Id = newId;
        }

        public List<MachineAssignment> GetAllMachineAssignments()
        {
            using var db = new SqlConnection(_connectionString);

            var machines = db.Query<MachineAssignment>("select * from MachineAssignments");

            return machines.ToList();
        }

        public MachineAssignment GetMachineAssignmentById(int Id)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from MachineAssignments
                          where id = @mid";

            var parameters = new { mid = Id };

            var machine = db.QueryFirstOrDefault<MachineAssignment>(query, parameters);

            return machine;
        }

        public void RemoveMachineAssignmet(int machineId)
        {
            var sql = @"DELETE 
                        FROM [dbo].[MachineAssignments]
                        WHERE Id = @id";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { id = machineId });
        }

        public List<MachineInfo> GetMachineAssignmentsByEmployeeId(int employeeId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { eid = employeeId };

            var machines = db.Query<MachineInfo>(@"select ma.machineId as [MachineId], m.Name as [Name], ma.Date as [Date], md.runtime as [Runtime], md.downtime as [Downtime], md.notes as [Notes], dc.codeText as [Codes], e.Id as [EmployeeId], e.firstName as [Firstname], e.lastName as [Lastname]
                                                    from MachineAssignments ma
                                                    join Machines m
                                                    on ma.machineId = m.Id
                                                    join MachineDetails md
                                                    on ma.machineDetailId = md.Id
                                                    join DowntimeCodes dc
                                                    on ma.downtimeCodeId = dc.Id
                                                    join Employees e
                                                    on ma.employeeId = e.Id
                                                    where ma.employeeId = @eid
                                                    and Date != convert(varchar(10), getdate(), 101)", parameters);

            return machines.ToList();
        }

        public List<MachineAssignment> GetMachineAssignmentsByEmployeeIdAndCurrentDate(int employeeId)
        {
            using var db = new SqlConnection(_connectionString);

            var parameters = new { eid = employeeId };

            var machines = db.Query<MachineAssignment>(@"select *
                                                        from MachineAssignments
                                                        where employeeId = @eid
                                                        and Date = convert(varchar(10), getdate(), 101)", parameters);

            return machines.ToList();
        }

        public MachineInfo GetSingleMachineAssignmentInfoByEmployeeIdAndMachineId(int employeeId, int machineId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select ma.machineId as [MachineId], m.name as [Name], ma.Date AS [Date], md.runtime as [Runtime], md.downtime as [Downtime], md.notes as [Notes], dc.codeText as [Codes], e.Id as [EmployeeId], e.firstName as [Firstname], e.lastName as [Lastname]  
                            from MachineAssignments ma
                            join Machines m on ma.machineId = m.Id
                            join MachineDetails md on md.Id = ma.machineDetailId
                            join DowntimeCodes dc on dc.Id = ma.downtimeCodeId
                            join Employees e on e.Id = ma.employeeId
                            where e.Id = @eid
                            and m.Id = @mid";

            var parameters = new { eid = employeeId, mid = machineId };

            var info = db.QueryFirstOrDefault<MachineInfo>(query, parameters);

            return info;
        }

        public MachineSchedule GetSingleMachineAssignmentScheduleByEmployeeIdAndMachineId(int employeeId, int machineId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select ma.Id as [machineId], m.name as [Name], ma.Date AS [Date], e.Id as [employeeId], e.firstName as [Firstname], e.lastName as [Lastname]
                            from MachineAssignments ma
                            join Machines m
                            on ma.machineId = m.Id
                            join Employees e
                            on ma.employeeId = e.Id
                            Where e.Id = @eid
                            And m.Id = @mid
                            And Date = convert(varchar(10), getdate(), 101)";

            var parameters = new { eid = employeeId, mid = machineId };

            var schedule = db.QueryFirstOrDefault<MachineSchedule>(query, parameters);

            return schedule;
        }
    }
}
