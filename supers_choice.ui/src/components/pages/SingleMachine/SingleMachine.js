import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './SingleMachine.scss';
import machinesData from '../../../helpers/data/machinesData';


class SingleMachine extends React.Component {
  state = {
    machine: {},
  }


componentDidMount() {
  const employeeId = this.props.match.params.employeeId;
  machinesData.getMachineInfoByEmployeeId(employeeId)
  .then((response) => this.setState({ machine: response }))
  .catch((err) => console.error(err));
}



  render() {
    const { machine } = this.state;

    return (
      <div className="SingleMachine mt-5">
        <h1 className="mt-5">{machine.name}</h1>
        <h3 className="mt-5">{machine.date}</h3>
        <form>
          <div>
            <input type="text" className="form-control text-center mb-3" placeholder="Runtime"/>
          </div>
          <div>
            <input type="text" className="form-control text-center mb-3" placeholder="Downtime"/>
          </div>
          <UncontrolledDropdown className="mb-3">
            <DropdownToggle caret className="dropDown bg-dark">
              Dropdown
            </DropdownToggle>
            <DropdownMenu className="menu text-center">
              <DropdownItem>1. cleaning</DropdownItem>
              <DropdownItem>2. maintenance</DropdownItem>
              <DropdownItem>3. quality</DropdownItem>
              <DropdownItem>4. no material</DropdownItem>
              <DropdownItem>5. meeting</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <textarea className="mb-3" cols="40" rows="10">{machine.notes}</textarea>
        </form>
        <div className="btnContainer1">
          <div className="top-left mb-3">
            <button className="start btn btn-success">Start</button>
          </div>
          <div className="top-right">
            <button className="pause btn btn-primary">Pause</button>
          </div>
        </div>
        <div className="btnContainer2">
          <div className="bottom-left">
            <button className="stop btn btn-danger">Stop</button>
          </div>
          <div className="bottom-right">
            <button className="reset btn btn-warning">Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleMachine;