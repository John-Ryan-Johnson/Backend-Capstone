import React from 'react';
import './EmployeeScheduleTable.scss';
import { Link } from 'react-router-dom';

class EmployeeScheduleTable extends React.Component {
  render() {
    const { machine, employeeId } = this.props;

    if (machine) {
      return (
        <div className="EmployeeScheduleTable">
          <tr>
            <td>{machine.name}</td>
            <td>{machine.Date}</td>
            <Link to={`/schedule/${employeeId}`}>View</Link>
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