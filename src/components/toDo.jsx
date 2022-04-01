import React from 'react';
import '../assets/style/tasklist.css';
import Task from './task.jsx'

export default class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.doneTask= this.props.doneTask;
    this.trier=this.props.trier;
    this.state = {filterValue : ''};

    this.changePriority=this.props.changePriority;
  }
/*set the value of the state filter
*@param {String} the text you want to insert the state filterValue
*/
  filterChanged(text){
    this.setState({filterValue : text});
  }
/*initialize the task you need to do
@return {Array} the list of task*/
  createTask(){
    let priorities = [...this.props.priorities];
    priorities.sort( (a,b) => b[1] - a[1] );
    const list_tasks = priorities.map( prio =>{
    const tache = this.props.listOfTasks.find(tache => tache.id == prio[0]);
    if (tache!=undefined){
    if ( tache.description.includes(this.state.filterValue.toLowerCase())){
        return <Task  {...tache } key={tache.id} doneTask={this.doneTask} priority = {prio[1]} changePriority={this.props.changePriority}/>;
    }}
    })
    return list_tasks;
  }

  render() {
    const list_tasks = this.createTask();
    const temps_total = list_tasks.reduce( (acc,task) => {return (task != undefined ? acc+task.props.duration : acc);}, 0);
    const nb_tache = list_tasks.reduce( (acc, elt) => elt != undefined?acc+1:acc,0 );
    const information= `Il y a ${nb_tache} taches en cours pour une durée de ${temps_total} mn`;
    return (
      <div className="tasklist">
        <h3>Tâches en cours</h3>
        <input type="text" value={this.state.filterValue} onChange={(e) => this.filterChanged(e.target.value)}/> <br/>
        {information}
        {list_tasks}
      </div>
    );
  }
}
