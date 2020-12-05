using Dapper;
using Microsoft.Data.SqlClient;
using Supers_Choice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Supers_Choice.Data
{
    public class DowntimeCodeRepository
    {
        static List<DowntimeCode> _downTimeCodes = new List<DowntimeCode>();

        const string _connectionString = "Server=localhost;Database=SupersChoice;Trusted_Connection=True;";

        public List<DowntimeCode> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var downtimeCodes = db.Query<DowntimeCode>("select * from downtimeCodes");

            return downtimeCodes.ToList();
        }

        public DowntimeCode GetById(int downtimeCodeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from DowntimeCodes
                          where id = @dtcid";

            var parameters = new { dtcid = downtimeCodeId };

            var downtimeCode = db.QueryFirstOrDefault<DowntimeCode>(query, parameters);

            return downtimeCode;
        }
    }
}
