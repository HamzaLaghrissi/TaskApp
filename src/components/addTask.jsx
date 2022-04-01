import React from 'react';
import '../assets/style/addtask.css';
import Task from './task.jsx'

export default class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state={ addValueDesc: '', addValueTime : null};
  }
/* change the state addValueDesc
@param {String} the text you want to insert in your state addValueDesc
*/
  addValueDescChange(text){
    this.setState({addValueDesc : text} );
  }
  /* change the time addValueTime
  @param {Integer} the time you want to insert in your state addValueTime
  */

  addValueTimeChange(time){
    this.setState({addValueTime : parseInt(time)});
  }

  render() {
    return (
    <div className="addtask">
      <input type="text" ref="tachedesc" placeholder="votre tache.." onChange={ event => {
        this.addValueDescChange(event.target.value);
      }   }/>
      <input type="number" ref="tachetime" min='0' onChange={e =>
      this.addValueTimeChange(e.target.value)}/>mn<button onClick={() => {
        this.props.addTask(this.state.addValueDesc, this.state.addValueTime);
        this.refs.tachedesc.value="";
        this.refs.tachetime.value="";

      }
        }
        >
        add</button>
    </div>
  )
  }
} 
