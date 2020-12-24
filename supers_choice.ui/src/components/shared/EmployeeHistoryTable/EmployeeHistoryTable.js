import React from 'react';
import Moment from 'react-moment';
import './EmployeeHistoryTable.scss';
import { Link } from 'react-router-dom';

class EmployeeHistoryTable extends React.Component {
  render() {
    const { machine } = this.props;

    if (machine) {
      return (
        <>
          <tr>
            <td>{machine.name}</td>
            <td>
              <Moment format='MM/DD/YYYY'>{machine.date}</Moment>
            </td>
            <td>
              <Link
                className='machineLink'
                to={`/machine/info/${machine.employeeId}/${machine.id}`}
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
