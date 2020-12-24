import React from 'react';
import './Machines.scss';
import MachinesList from '../../shared/MachinesList/MachinesList';
import machinesData from '../../../helpers/data/machinesData';


class Machines extends React.Component {
  state = {
    machines: [],
  }

  getMachines = () => {
    machinesData.getAllMachines()
    .then((machines) => this.setState({ machines }))
    .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getMachines();
  }

  render() {
    const { machines } = this.state;
    const buildMachineList = machines.map((machine) => {
      return <MachinesList key={machine.id} machine={machine}/>
    });

    return (
      <div className="Machines mb-5">
        <h1>Machines</h1>
        <div className="d-flex flex-wrap">
          <ul className="list-group">
            {buildMachineList}
          </ul>
        </div>
      </div>
    );
  }
}

export default Machines;