import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SingleMachineSchedulePage.scss';
import machinesData from '../../../helpers/data/machinesData';

class SingleMachineSchedulePage extends React.Component {
  state = {
    machine: {},
  }

  componentDidMount() {
    const employeeId = this.props.match.params.employeeId;
    const machineId = this.props.match.params.machineId;
    machinesData.getMachineScheduleByEmployeeId(employeeId, machineId)
    .then((response) => this.setState({ machine: response }))
    .catch((err) => console.error(err));
  }

  render() {
    const { machine } = this.state;

    return (
      <div className="SingleMachineSchedulePage mt-5">
        <Form>
          <FormGroup>
            <h1 className="name mt-5">{machine.name}</h1>
            <h3 className="date mt-3 mb-3">{machine.date}</h3>
            <h5 className="name mb-3">Operator: {machine.firstname} {machine.lastname}</h5>
            <Label for="runtime">Runtime</Label>
            <Input className="text-center" type="text" name="runtime" id="runtime" placeholder="0" />
          </FormGroup>
          <FormGroup>
            <Label for="downtime">Downtime</Label>
            <Input className="text-center" type="text" name="downtime" id="downtime" placeholder="0" />
          </FormGroup>
          <FormGroup>
            <Label for="codes">Select Multiple</Label>
            <Input type="select" name="codes" id="codes" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="notes">Text Area</Label>
            <Input type="textarea" name="text" id="notes" />
          </FormGroup>
          <div className="btnContainerOne mt-3">
            <Button className="top-left mr-5 btn btn-success">Start</Button>
            <Button className="top-right ml-5 btn btn-info">Pause</Button>
          </div>
          <div className="btnContainerTwo mt-5">
            <Button className="bottom-left mr-5 btn btn-danger">Stop</Button>
            <Button className="bottom-right ml-5 btn btn-warning">Reset</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SingleMachineSchedulePage;