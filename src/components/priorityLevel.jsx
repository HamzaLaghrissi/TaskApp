import React from 'react';
import '../assets/style/task.css';
import '../assets/style/priorityLevel.css';


export default class PriorityLevel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
/*change the priority of a tasks when clicking on this
*
*/
  handleClick(){

    this.props.changePriority(this.props.idTache,this.props.level);

  }


  render() {

    const couleur=this.props.etat ? <div className="level on" onClick={this.handleClick}></div> :
    <div className="level off" onClick={this.handleClick} ></div>
    return (
      <div>
      {couleur}
      </div>
    );
  }
}
