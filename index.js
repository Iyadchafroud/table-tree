import "ka-table/style.scss";
import "./style.scss";

import React, { Component } from 'react';
import { render } from 'react-dom';
import Demo from './Demo';

class App extends Component {
  render() {
    return (
      <div>
        <Demo />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
