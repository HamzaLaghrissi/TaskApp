import React from 'react';
import '../assets/style/tasklist.css';
import Task from './task.jsx'
export default class Done extends React.Component {
  constructor(props) {
    super(props);
    this.state={show : false}
  }
/*
*Create the list of tasks already done using the state listOfTasksDone
*@return {Array} the array of tasks done
*/
  createTask(){
    let priorities = [...this.props.priorities];
    priorities.sort( (a,b) => b[1] - a[1] );
    const list_tasks = priorities.map( prio =>{
    const tache = this.props.listOfTasksDone.find(tache => tache.id == prio[0]);
    if (tache!=undefined){
      return <Task  {...tache } key={tache.id} doneTask={this.doneTask} priority = {prio[1]} changePriority={this.props.changePriority}/>;
    }
    })
    return list_tasks;
  }


  render() {
    const list_tasks_done = this.createTask();
    if (!this.state.show){
      return(
        <div>
          Tâches terminées
          <button onClick=
            {() => this.setState({show : true})}>
              +({this.props.listOfTasksDone.length})
          </button>
        </div>);
    }
    else{
      return (
      <div className="tasklist">
        Tâche terminée
        <button
          onClick= {
            () => this.setState({show : false})
          }>-</button>
        {list_tasks_done}
      </div>
    );
  }
}}
