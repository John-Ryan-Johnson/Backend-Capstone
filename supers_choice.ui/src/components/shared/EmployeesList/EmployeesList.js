import React from 'react';
import './EmployeesList.scss';
import { Link } from 'react-router-dom';
import employeeShape from '../../../helpers/propz/employeeShape';

class EmployeesList extends React.Component {
  static propTypes = {
    employee: employeeShape.employeeShape,
  }

  render() {
    const { employee } = this.props;
    const scheduleLink = `/schedule/${employee.id}`;
    const historyLink = `/history/${employee.id}`;

    return (
      <div className="EmployeesList">
        <li className="list-group-item">
          <h3 className="item-name">{employee.firstName} {employee.lastName}</h3>
          <div className="linkContainer mt-3">
            <Link to={scheduleLink}><i className="fas fa-calendar-alt fa-md"></i></Link>
            <Link to={historyLink}><i className="fas fa-history fa-md"></i></Link>
          </div>
        </li>
      </div>
    );
  }
}

export default EmployeesList;