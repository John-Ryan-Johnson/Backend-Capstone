import React from 'react';
import './EmployeeSchedule.scss';
import EmployeeScheduleTable from '../../shared/EmployeeScheduleTable/EmployeeScheduleTable';
import machinesData from '../../../helpers/data/machinesData';

class EmployeeSchedule extends React.Component {
  state = {
    machines: [],
  }

  getIdThenGetMachines = () => {
    const employeeId = this.props.match.params.employeeId;
    machinesData.getMachinesByEmployeeId(employeeId)
    .then(machines => this.setState({ machines }))
  }

  componentDidMount() {
    this.getIdThenGetMachines();
  }

  render() {
    const { machines } = this.state;
    const buildScheduleTable = () => machines.map((machine) => {
      return <EmployeeScheduleTable key={machine.Id} machine={machine} />;
    })

    if (machines === !null) {
    return (
      <div className="EmployeeSchedule">
        <h1 className="mb-5">Employee Schedule</h1>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Machine</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {buildScheduleTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
    } else {
      return (
        <div className="EmployeeSchedule">
          <h1 className="mb-5">Employee Schedule</h1>
          <h3>You are not on the schedule.</h3>
        </div>
      )
    }
  }
}

export default EmployeeSchedule;