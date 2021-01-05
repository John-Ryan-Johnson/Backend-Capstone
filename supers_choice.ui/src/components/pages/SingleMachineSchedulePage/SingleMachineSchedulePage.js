import React from 'react';
import Moment from 'react-moment';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './SingleMachineSchedulePage.scss';
import machineAssignmentsData from '../../../helpers/data/machineAssignmentsData';
import downtimeCodesData from '../../../helpers/data/downtimeCodesData';
import machineDetailsData from '../../../helpers/data/machineDetailsData';

class SingleMachineSchedulePage extends React.Component {
  state = {
    downtimeCodes: [],
    machineId: this.props.match.params.machineId * 1,
    notes: '',
    runtime: 0,
    downtime: 0,
    downtimeCodeId: 1,
    machineAssignmentId: 0,
    employeeId: this.props.match.params.employeeId * 1,
    isCompleted: false,
  };

  getDowntimeCodes = () => {
    downtimeCodesData
      .getAllDowntimeCodes()
      .then((downtimeCodes) => this.setState({ downtimeCodes }))
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    const { machineId, employeeId } = this.state;
    machineAssignmentsData
      .getMachineAssignmentScheduleByEmployeeIdAndMachineId(
        employeeId,
        machineId
      )
      .then((response) =>
        this.setState({
          machine: response,
          machineAssignmentId: response.machineAssignmentId,
        })
      )
      .catch((err) => console.error(err));
    this.getDowntimeCodes();
  }

  runtimeChange = (e) => {
    e.preventDefault();
    this.setState({ runtime: e.target.value * 1 });
  };

  downtimeChange = (e) => {
    e.preventDefault();
    this.setState({ downtime: e.target.value * 1 });
  };

  notesChange = (e) => {
    e.preventDefault();
    this.setState({ notes: e.target.value });
  };

  downtimeCodeIdChange = (e) => {
    e.preventDefault();
    this.setState({ downtimeCodeId: e.target.value * 1 });
  };

  isCompletedChange = (e) => {
    e.preventDefault();
    this.setState({ isCompleted: e.target.checked });
  };

  postMachineDetail = (e) => {
    e.preventDefault();
    const {
      machineId,
      runtime,
      downtime,
      notes,
      downtimeCodeId,
      employeeId,
      machineAssignmentId,
      isCompleted,
    } = this.state;
    const newObj = {
      machineAssignmentId,
      runtime,
      downtime,
      notes,
      downtimeCode: downtimeCodeId,
      isCompleted,
    };
    machineDetailsData
      .addMachineDetailWithDowntimeCode(newObj)
      .then(() =>
        this.props.history.push(
          `/machine/history/${employeeId}/${machineId}/${machineAssignmentId}`
        )
      )
      .catch((err) => console.error(err));
  };

  render() {
    const {
      machine,
      downtimeCodes,
      runtime,
      downtime,
      notes,
      downtimeCodeId,
      isCompleted,
    } = this.state;
    const buildCodeSelectList = downtimeCodes.map((downtimeCode) => {
      return (
        <option key={downtimeCode.id} value={downtimeCode.id}>
          {downtimeCode.codeText}
        </option>
      );
    });

    if (machine) {
      return (
        <div className='SingleMachineSchedulePage mt-5'>
          <Form>
            <FormGroup>
              <h1 className='name mt-5'>{machine.name}</h1>
              <h3 className=' form-control date mt-3 mb-3'>
                <Moment format='MM/DD/YYYY'></Moment>
              </h3>
              <h5 className='name mb-3'>
                Operator: {machine.firstname} {machine.lastname}
              </h5>
              <Label for='runtime'>Runtime</Label>
              <Input
                className='text-center'
                type='number'
                name='runtime'
                id='runtime'
                placeholder='0.00'
                value={runtime}
                onChange={this.runtimeChange}
                step='0.25'
              />
            </FormGroup>
            <FormGroup>
              <Label for='downtime'>Downtime</Label>
              <Input
                className='text-center'
                type='number'
                name='downtime'
                id='downtime'
                placeholder='0.00'
                value={downtime}
                onChange={this.downtimeChange}
                step='0.25'
              />
            </FormGroup>
            <FormGroup>
              <Label for='codes'>Select Multiple</Label>
              <Input
                type='select'
                name='codes'
                id='codes'
                value={downtimeCodeId}
                onChange={this.downtimeCodeIdChange}
              >
                {buildCodeSelectList}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='notes'>Text Area</Label>
              <Input
                type='textarea'
                name='text'
                id='notes'
                value={notes}
                onChange={this.notesChange}
              />
            </FormGroup>
            <FormGroup check>
              <Input
                type='checkbox'
                id='isCompleted'
                checked={isCompleted}
                onChange={this.isCompletedChange}
              />{' '}
              <Label check>IsCompleted</Label>
            </FormGroup>

            <Button
              className='btn btn-dark mt-5'
              onClick={this.postMachineDetail}
            >
              Save
            </Button>
          </Form>
        </div>
      );
    } else {
      return <h3>You are not on the schedule.</h3>;
    }
  }
}

export default SingleMachineSchedulePage;
