import React from 'react';
import Moment from 'react-moment';
import './EmployeeHistoryTable.scss';
import { Link } from 'react-router-dom';

class EmployeeHistoryTable extends React.Component {
  render() {
    const { machineAssignment } = this.props;
    const singleMachineHistoryLink = `/machine/history/${machineAssignment.employeeId}/${machineAssignment.machineId}/${machineAssignment.machineAssignmentId}`;

    return (
        <>
          <tr>
            <td>{machineAssignment.name}</td>
            <td>
              <Moment format='MM/DD/YYYY'>{machineAssignment.date}</Moment>
            </td>
            <td>
              <Link className='machineLink' to={singleMachineHistoryLink}>View</Link>
            </td>
          </tr>
        </>
      );
  }
}

export default EmployeeHistoryTable;
