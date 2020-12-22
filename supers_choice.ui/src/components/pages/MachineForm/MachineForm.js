import React from 'react';
import Moment from 'react-moment';
import './MachineForm.scss';
import machinesData from '../../../helpers/data/machinesData';


class MachineForm extends React.Component {
  state = {
    machine: {},
    employees: [],
  }

  componentDidMount() {
    const { machineId } = this.props.match.params;
    machinesData.getMachineById(machineId)
    .then((machine) => this.setState({ machine }))
    .catch((err) => console.error(err));
  }

  render() {
    const { machine } = this.state;
    return (
      <div className="MachineForm mt-5">
        <h1 className="mt-5">Machine Form</h1>
        <h3 className="mt-3">{machine.name}</h3>
        <h4 className="mt-3"><Moment format="MM/DD/YYYY">{Date()}</Moment></h4>
      </div>
    );
  }
}

export default MachineForm;