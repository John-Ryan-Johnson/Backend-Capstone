import React from 'react';
import Moment from 'react-moment';
import './SingleMachineHistoryPage.scss';
import machinesData from '../../../helpers/data/machinesData';


class SingleMachineHistoryPage extends React.Component {
  state = {
    machine: {},
  }


componentDidMount() {
  const employeeId = this.props.match.params.employeeId;
  const machineId = this.props.match.params.machineId;
  machinesData.getMachineInfoByEmployeeId(employeeId, machineId)
  .then((response) => this.setState({ machine: response }))
  .catch((err) => console.error(err));
}

  render() {
    const { machine } = this.state;

    return (
      <div className="SingleMachineHistoryPage">
        <h1 className="name mt-5">{machine.name}</h1>
        <h3 className="date mt-3 mb-3"><Moment format="MM/DD/YYYY">{machine.date}</Moment></h3>
        <h5 className="name mb-3">Operator: {machine.firstname} {machine.lastname}</h5>
          <div>
            <h4 className="runtime text-center mb-3">Runtime: {machine.runtime}</h4>
          </div>
          <div>
            <h4 className="downtime text-center mb-3">Downtime: {machine.downtime}</h4>
          </div>
          <div>
            <h6 className="codes mb-3">Code: {machine.codes}</h6>
            <h6 className="codes mb-3">Notes: {machine.notes}</h6>
          </div>
      </div>
    );
  }
}

export default SingleMachineHistoryPage;