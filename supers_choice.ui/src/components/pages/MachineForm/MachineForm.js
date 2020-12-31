import React from 'react';
import Moment from 'react-moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './MachineForm.scss';
import employeesData from '../../../helpers/data/employeesData';
import machineAssignmentsData from '../../../helpers/data/machineAssignmentsData';

class MachineForm extends React.Component {
  state = {
    employees: [],
    machine: this.props.match.params,
    machineAssignmentMachineId: this.props.match.params.machineId *1,
    machineAssignmentEmployeeId: 4,
  }

  changeMachineId = (e) => {
    e.preventDefault();
    this.setState({ machineId: e.target.value });
  }

  changeEmployeeId = (e) => {
    e.preventDefault();
    this.setState({ machineAssignmentEmployeeId: e.target.value * 1 });
  }

  saveAssignment = (e) => {
    e.preventDefault();
    const {
      machineAssignmentMachineId,
      machineAssignmentEmployeeId,
    } = this.state;

    const newAssignment = {
      machineId: machineAssignmentMachineId,
      employeeId: machineAssignmentEmployeeId,
    };

    machineAssignmentsData.postMachineAssignment(newAssignment)
    .then(() => this.props.history.push(`/schedule/${machineAssignmentEmployeeId}`))
    .catch((err) => console.error('unable to save assignment', err));
  }

  getEmployees = () => {
    employeesData.getAllEmployees()
    .then((employees) => this.setState({ employees }))
    .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getEmployees();
  }

  render() {
    const { machineAssignmentEmployeeId, machine, employees } = this.state;
    const buildEmployeeSelectList = employees.map((employee) => {
      return <option value={employee.id}>{employee.firstName} {employee.lastName}</option>
    });

    return (
      <div className="MachineForm mt-5">
        <h1 className="mt-5">Machine Form</h1>
          <Form>
            <FormGroup>
              <h3 className="form-control mt-5" id="machine-name" value={machine.name}>{machine.machineName}</h3>
            </FormGroup>
            <FormGroup>
              <h4 className="form-control mt-3" id="machine-date" value={machine.date}><Moment format="MM/DD/YYYY">{Date()}</Moment></h4>
            </FormGroup>
            <FormGroup>
              <Label for="employee-name">Select Employee</Label>
              <Input type="select" className="form-control" id="employee-name" value={machineAssignmentEmployeeId} onChange={this.changeEmployeeId}>
                {buildEmployeeSelectList}
              </Input>
            </FormGroup>
            <Button className="btn btn-dark mt-3" onClick={this.saveAssignment}>Save</Button>
          </Form>
      </div>
    );
  }
}

export default MachineForm;