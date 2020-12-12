import React from 'react';
import './EmployeeScheduleTable.scss';
import { Link } from 'react-router-dom';

class EmployeeScheduleTable extends React.Component {
  render() {
    const { machine, employeeId } = this.props;
    const dateProp = machine.date;
    const shortDate = dateProp.substring(0, 10);

    if (machine) {
      return (
        <div className="EmployeeScheduleTable">
          <tr>
            <td>{machine.name}</td>
            <td>{shortDate}</td>
            <td><Link className="view btn btn-dark btn-sm ml-5" to={`/machine/${employeeId}`}>View</Link></td>
          </tr>
        </div>
      );
    } else {
      return (
        <h3>You are not on the schedule.</h3>
      )
    }
  }
}

export default EmployeeScheduleTable;