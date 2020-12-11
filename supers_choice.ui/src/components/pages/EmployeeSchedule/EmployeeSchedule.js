import React from 'react';
import './EmployeeSchedule.scss';
import EmployeeScheduleTable from '../../shared/EmployeeScheduleTable/EmployeeScheduleTable';
import machinesData from '../../../helpers/data/machinesData';

class EmployeeSchedule extends React.Component {
  state = {
    machines: [],
  }

  getIdThenGetMachines = () => {
    const employeeId = this.props.employeeId;
    machinesData.getMachinesByEmployeeId(employeeId)
    .then(machines => this.setState({ machines }))
  }

  componentDidMount() {
    this.getIdThenGetMachines();
  }

  render() {
    const { machines } = this.state;
    console.log(this.state);
    const buildScheduleTable = machines.map((machine) => {
      return <EmployeeScheduleTable key={machine.Id} machine={machine} />;
    })

    return (
      <div className="EmployeeSchedule">
        <h1 className="mb-5">Employee Schedule</h1>
        <div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Machine</th>
                <th scope="col">Date</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {buildScheduleTable}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeSchedule;