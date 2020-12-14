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
    const singleEmployeeLink = `/employee/${employee.Id}`;
    return (
      <div className="EmployeesList">
        <li className="list-group-item">
          <Link to={singleEmployeeLink}><h3 className="item-name">{employee.firstName} {employee.lastName}</h3></Link>
        </li>
      </div>
    );
  }
}

export default EmployeesList;