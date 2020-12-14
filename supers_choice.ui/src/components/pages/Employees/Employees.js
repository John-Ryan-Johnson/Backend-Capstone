import React from 'react';
import './Employees.scss';
import EmployeesList from '../../shared/EmployeesList/EmployeesList';
import employeesData from '../../../helpers/data/employeesData';


class Employees extends React.Component {
  state = {
    employees: [],
  }

  getEmployees = () => {
    employeesData.getAllEmployees()
    .then((employees) => this.setState({ employees }))
    .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    const { employees } = this.state;
    const buildEmployeeList = employees.map((employee) => {
      return <EmployeesList key={employee.id} employee={employee}/>
    });

    return (
      <div className="Employees">
        <h1>Employees</h1>
        <div className="d-flex flex-wrap">
          <ul className="list-group mb-5">
            {buildEmployeeList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Employees;