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

        public void Remove(int machineDetailId)
        {
            var sql = @"DELETE 
                        FROM [dbo].[MachineDetails]
                        WHERE Id = @id";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { id = machineDetailId });
        }
    }
}
