import React from 'react';
import Moment from 'react-moment';
import './EmployeeHistoryTable.scss';
import { Link } from 'react-router-dom';

class EmployeeHistoryTable extends React.Component {
  render() {
    const { machineAssignment } = this.props;

    if (machineAssignment) {
      return (
        <>
          <tr>
            <td>{machineAssignment.name}</td>
            <td>
              <Moment format='MM/DD/YYYY'>{machineAssignment.date}</Moment>
            </td>
            <td>
              <Link
                className='machineLink'
                to={`/machine/info/${machineAssignment.employeeId}/${machineAssignment.machineId}`}
              >
                View
              </Link>
            </td>
          </tr>
        </>
      );
    } else {
      return <h3>You don't have a history.</h3>;
    }
  }
}

export default EmployeeHistoryTable;
