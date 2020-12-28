import React from 'react';
import Moment from 'react-moment';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './MachineForm.scss';
import employeesData from '../../../helpers/data/employeesData';



class MachineForm extends React.Component {
  state = {
    machine: this.props.match.params,
    employees: [],
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
    const { machine, employees } = this.state;
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
              <Input type="select" className="form-control" id="employee-name" value={machine.employeeId}>
                {buildEmployeeSelectList}
              </Input>
            </FormGroup>
            <Button className="btn btn-dark mt-3">Save</Button>
          </Form>
      </div>
    );
  }
}

export default MachineForm;