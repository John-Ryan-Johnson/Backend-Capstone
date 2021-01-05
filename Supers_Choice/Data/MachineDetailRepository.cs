using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Supers_Choice.Models;

namespace Supers_Choice.Data
{
    public class MachineDetailRepository
    {
        static List<MachineDetail> _machineDetails = new List<MachineDetail>();

        const string _connectionString = "Server=localhost;Database=SupersChoice;Trusted_Connection=True;";

        
        public List<MachineDetail> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var machineDetails = db.Query<MachineDetail>("select * from machineDetails");

            return machineDetails.ToList();
        }

        public MachineDetail GetById(int machineDetailId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from MachineDetails
                          where id = @mdid";

            var parameters = new { mdid = machineDetailId };

            var machineDetail = db.QueryFirstOrDefault<MachineDetail>(query, parameters);

            return machineDetail;
        }

        public int AddMachineDetail(MachineDetailWithDowntimeCode obj)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"INSERT INTO [dbo].[MachineDetails]
                           ([notes]
                           ,[runtime]
                           ,[downtime])
                    output inserted.id
                     VALUES
                           (@notes
                           ,@runtime
                           ,@downtime)";

            var newMachineDetailId = db.ExecuteScalar<int>(sql, obj);

            var sqlToUpdateAssignment = @"UPDATE [dbo].[MachineAssignments]
                                           SET [downtimeCodeId] = @downtimeCodeId
                                              ,[machineDetailId] = @machineDetailId
                                              ,[isCompleted] = @isCompleted
                                         WHERE Id = @machineAssignmentId";

            var parameters = new
            {
                machineAssignmentId = obj.MachineAssignmentId,
                downtimeCodeId = obj.DowntimeCode,
                machineDetailId = newMachineDetailId,
                isCompleted = obj.IsCompleted,
            };

            var updateMachineAssignment = db.QueryFirstOrDefault<MachineAssignment>(sqlToUpdateAssignment, parameters);

            return newMachineDetailId;
        }

    }
}
