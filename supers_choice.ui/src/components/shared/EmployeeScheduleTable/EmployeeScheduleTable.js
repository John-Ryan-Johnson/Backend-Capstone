import React from 'react';
import Moment from 'react-moment';
import './EmployeeScheduleTable.scss';
import { Link } from 'react-router-dom';


class EmployeeScheduleTable extends React.Component {
  render() {
    const { machineAssignment } = this.props;
    const singleMachineScheduleLink = `/machine/schedule/${machineAssignment.employeeId}/${machineAssignment.machineId}`;

    return (
        <>
          <tr>
            <td>{machineAssignment.name}</td>
            <td>
              <Moment format='MM/DD/YYYY'>{machineAssignment.date}</Moment>
            </td>
            <td>
              <Link className='machineLink' to={singleMachineScheduleLink}>View</Link>
            </td>
          </tr>
        </>
      );
  }
}

export default EmployeeScheduleTable;
