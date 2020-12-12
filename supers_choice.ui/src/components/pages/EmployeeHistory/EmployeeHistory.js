import React from 'react';
import './EmployeeHistory.scss';
import EmployeeHistoryTable from '../../shared/EmployeeHistoryTable/EmployeeHistoryTable';
import machinesData from '../../../helpers/data/machinesData';

class EmployeeHistory extends React.Component {
  state = {
    machines: [],
  }

  getIdThenGetMachines = () => {
    const employeeId = this.props.match.params.employeeId;
    console.log(employeeId);
    machinesData.getMachinesByEmployeeId(employeeId)
    .then(machines => this.setState({ machines }))
  }

  componentDidMount() {
    this.getIdThenGetMachines();
  }

  render() {
    const { machines } = this.state;
    console.log(this.state);
    const buildHistoryTable = () => machines.map((machine) => {
      return <EmployeeHistoryTable key={machine.Id} machine={machine} />;
    })

    return (
      <div className="EmployeeHistory">
        <h1 className="mb-5">Employee History</h1>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col-1">Machine</th>
                <th scope="col-5">Date</th>
                <th scope="col">Details</th>
              </tr>
            </thead>
            <tbody>
              {buildHistoryTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeHistory;