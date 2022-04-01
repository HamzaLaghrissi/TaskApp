import React from 'react';
import '../assets/style/doneButton.css';

export default class DoneButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="doneButton">
        <img src='../images/check.png' width='20' onClick={() => this.props.doneTask(this.props.task)}/>
      </div>
    );
  }
}
