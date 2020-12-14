import React from 'react';
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
      <div className="SingleMachine">
        <h1>{machine.name}</h1>
        <h3>{machine.date}</h3>
        <form>
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Runtime"/>
          </div>
          <div className="col-6">
            <input type="text" className="form-control" placeholder="Downtime"/>
          </div>
          <div className="dropdown">
            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <option value="cleaning">1. cleaning</option>
              <option value="maintenance">2. maintenance</option>
              <option value="quality">3. quality</option>
              <option value="no material">4. no material</option>
              <option value="meeting">5. meeting</option>
            </div>
          </div>
          <textarea cols="30" rows="10">{machine.notes} {machine.codeText}</textarea>
        </form>
        <div className="btnContainer">
          <button className="start btn btn-success">Start</button>
          <button className="stop btn btn-danger">Stop</button>
          <button className="pause btn btn-secondary">Pause</button>
          <button className="reset btn btn-warning">Reset</button>
        </div>
      </div>
    );
  }
}

export default SingleMachine;