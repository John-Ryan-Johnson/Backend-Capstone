using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Supers_Choice.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;


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
                               ,[isDeleted]        
                               ,[email]
                               ,[password]
                               ,[firebaseUid])
                        Output inserted.id
                        VALUES (@firstName,@lastName,@isSupervisor,@isDeleted,@email,@password, @firebaseUid)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, employeeToAdd);

            employeeToAdd.Id = newId;
        }

        public List<Employee> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var employees = db.Query<Employee>(@"select * from employees
                                                where isDeleted = 0
                                                order by firstName asc");

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

        public Employee GetByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select *
                          from Employees
                          where firebaseUid = @uid";

            var parameters = new { uid };

            var employee = db.QueryFirstOrDefault<Employee>(query, parameters);

            return employee;
        }
    }
}
