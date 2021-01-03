import React from 'react';
import './EmployeeSchedule.scss';
import EmployeeScheduleTable from '../../shared/EmployeeScheduleTable/EmployeeScheduleTable';
import machineAssignmentsData from '../../../helpers/data/machineAssignmentsData';

class EmployeeSchedule extends React.Component {
  state = {
    machineAssignments: [],
  }

  getIdThenGetMachines = () => {
    const employeeId = this.props.match.params.employeeId * 1;
    machineAssignmentsData.getMachineAssignmentsByEmployeeIdAndTodaysDate(employeeId)
    .then(machineAssignments => this.setState({ machineAssignments }))
  }


  componentDidMount() {
    this.getIdThenGetMachines();
  }

  render() {
    const { machineAssignments } = this.state;
    const buildScheduleTable = () => machineAssignments.map((machineAssignment) => {
      return <EmployeeScheduleTable key={machineAssignment.Id} machineAssignment={machineAssignment} />;
    })

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
  }
}

export default EmployeeSchedule;
