import React from 'react';
import Moment from 'react-moment';
import './EmployeeScheduleTable.scss';
import { Link } from 'react-router-dom';


class EmployeeScheduleTable extends React.Component {
  render() {
    const { machine } = this.props;


    if (machine.date === new Date()) {
      return (
        <div>
          <tr>
            <td>{machine.name}</td>
            <td><Moment format="MM/DD/YYYY">{machine.date}</Moment></td>
            <td><Link className="machineLink" to={`/machine/schedule/${machine.employeeId}/${machine.id}`}>View</Link></td>
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