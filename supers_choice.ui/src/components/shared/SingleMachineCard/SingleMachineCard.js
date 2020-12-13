import React from 'react';
import './SingleMachineCard.scss';

class SingleMachineCard extends React.Component {
  render() {
    return (
      <div className="SingleMachineCard">
        <h1>Machine Name</h1>
        <h3>Date</h3>
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
              <p className="dropdown-item">Code 1</p>
              <p className="dropdown-item">Code 2</p>
              <p className="dropdown-item">Code 3</p>
              <p className="dropdown-item">Code 4</p>
              <p className="dropdown-item">Code 5</p>
            </div>
          </div>
          <textarea cols="30" rows="10">Notes</textarea>
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

export default SingleMachineCard;