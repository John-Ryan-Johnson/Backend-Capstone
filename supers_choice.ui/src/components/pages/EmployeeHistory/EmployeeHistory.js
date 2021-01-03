import React from 'react';
import './EmployeeHistory.scss';
import EmployeeHistoryTable from '../../shared/EmployeeHistoryTable/EmployeeHistoryTable';
import machineAssignmentsData from '../../../helpers/data/machineAssignmentsData';

class EmployeeHistory extends React.Component {
  state = {
    machineAssignments: [],
  }

  getIdThenGetMachines = () => {
    const employeeId = this.props.match.params.employeeId;
    machineAssignmentsData.getMachineAssignmentsByEmployeeId(employeeId)
    .then(machineAssignments => this.setState({ machineAssignments }))
  }

  componentDidMount() {
    this.getIdThenGetMachines();
  }

  render() {
    const { machineAssignments } = this.state;
    const buildHistoryTable = () => machineAssignments.map((machineAssignment) => {
      return <EmployeeHistoryTable key={machineAssignment.machineAssignmentId} machineAssignment={machineAssignment} />;
    })

    return (
      <div className="EmployeeHistory">
        <h1 className="mb-5">Employee History</h1>
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
              {buildHistoryTable()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default EmployeeHistory;