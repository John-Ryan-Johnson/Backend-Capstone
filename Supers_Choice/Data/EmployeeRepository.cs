using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Supers_Choice.Models;

namespace Supers_Choice.Data
{
    public class EmployeeRepository
    {
        readonly string _connectionString;
        public EmployeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SupersChoice");
        }

        public void Add(Employee employeeToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Employees]
                               ([firstName]
                               ,[lastName]
                               ,[isSupervisor]
                               ,[isManager]
                                [isDeleted])
                        Output inserted.id
                        VALUES
                               (@firstName,@lastName,@isSupervisor,@isManager,@isDeleted)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, employeeToAdd);

            employeeToAdd.Id = newId;
        }

        public List<Employee> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var employees = db.Query<Employee>("select * from employees");

            return employees.ToList();
        }

        public Employee GetById(int employeeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Employees
                          where id = @eid";

            var parameters = new { eid = employeeId };

            var employee = db.QueryFirstOrDefault<Employee>(query, parameters);

            return employee;
        }

        public void Remove(int employeeId)
        {
            var sql = @"DELETE 
                        FROM [dbo].[Employees]
                        WHERE Id = @id";

            using var db = new SqlConnection(_connectionString);

            db.Execute(sql, new { id = employeeId });
        }
    }
}
