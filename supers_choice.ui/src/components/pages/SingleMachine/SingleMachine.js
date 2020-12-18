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
      <div className="SingleMachine mt-5">
        <h1 className="mt-5">{machine.name}</h1>
        <h3 className="mt-5">{machine.date}</h3>
        <form>
          <div className="col-12">
            <input type="text" className="form-control text-center mb-3" placeholder="Runtime"/>
          </div>
          <div className="col-12">
            <input type="text" className="form-control text-center mb-3" placeholder="Downtime"/>
          </div>
          <div className="dropdown">
            <button className="btn btn-dark dropdown-toggle col-12 mb-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
          <textarea cols="30" rows="10">{machine.notes}</textarea>
        </form>
        <div className="btnContainer1">
          <div className="top-left mb-3">
            <button className="start btn btn-success">Start</button>
          </div>
          <div className="bottom-left">
            <button className="stop btn btn-danger">Stop</button>
          </div>
        </div>
        <div className="btnContainer2">
          <div className="top-right">
            <button className="pause btn btn-primary">Pause</button>
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