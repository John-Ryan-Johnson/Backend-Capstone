import React from 'react';
import './EmployeeHistoryTable.scss';
import { Link } from 'react-router-dom';

class EmployeeHistoryTable extends React.Component {
  render() {
    const { machine } = this.props;
    const dateProp = machine.date;
    const shortDate = dateProp.substring(0, 10);

    if (machine) {
      return (
        <>
          <tr>
            <td>{machine.name}</td>
            <td>{shortDate}</td>
            <td>
              <Link className='machineLink' to={`/machine/info/${machine.employeeId}/${machine.id}`}>
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
