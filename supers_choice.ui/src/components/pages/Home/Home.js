import React from 'react';
import './Home.scss';
import stampingPress from '../../../assets/images/stamping_press.jpg';

class Home extends React.Component {
  render() {
    return (
      <div className="Home d-flex justify-content-center">
        <img src={stampingPress} className="press" alt="Stamping Press"/>
      </div>
    );
  }
}

export default Home;