import React from 'react';
import './MachinesList.scss';
import { Link } from 'react-router-dom';
import machineShape from '../../../helpers/propz/machineShape';

class MachinesList extends React.Component {
  static propTypes = {
    machine: machineShape.machineShape,
  }

  render() {
    const { machine } = this.props;
    const machineFormLink = `/machineForm/${machine.id}`
    return (
      <div className="MachinesList">
        <li className="list-group-item">
          <Link to={machineFormLink}><h3 className="item-name">{machine.name}</h3></Link>
        </li>
      </div>
    );
  }
}

export default MachinesList;