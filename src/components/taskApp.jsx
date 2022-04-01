import React from 'react';
import AddTask from './addTask.jsx';
import ToDo from './toDo.jsx';
import Done from './done.jsx';
import Task from './task.jsx';
import '../assets/style/taskApp.css';
import tasksData from '../data/tasksData.js';

export default class TaskApp extends React.Component {
  constructor(props) {
    super(props);
    const initPriorities=this.initPriorities();
    this.state={listOfTasks:[], listOfTasksDone:[], priorities : initPriorities,global:tasksData.length};
    this.doneTask=this.doneTask.bind(this);
    this.addTask=this.addTask.bind(this);
    this.initPriorities=this.initPriorities.bind(this);
    this.changePriority=this.changePriority.bind(this);

  }

/*initialize the state listOfTasks from data
*/

  async componentDidMount() {
   const data = await simulateFetch('http://source.of.data/tasksData');
   this.setState({ listOfTasks : data });
 }
/*produce the list of priorities
*@return {Array} the list of tasks (their id) with their priorities
*/
 initPriorities(){
    const prio = tasksData.map( tache => { return [tache.id,1];});
    return prio;
  }
/*set a task to done by giving it id as parametter
*@param {String} the id of the task
*/
  doneTask(task){
          const mytask = this.state.listOfTasks.find(e => e.id==task);
           this.setState({ listOfTasks : this.state.listOfTasks.filter(
           elt =>
           elt.id != task  )   ,listOfTasksDone : [...this.state.listOfTasksDone, mytask]
         });
  }
/*add a new task to the task todo
*@param {String} desc the description of the task
*@param {Integer} the time of the task
*/
  addTask(desc, time){
    let valeur=this.state.global+1;
    this.setState({global:valeur+1});
    const obj={id : `T${valeur}`,
    description : desc,
    duration : time
    };
    const new_prio=[...this.state.priorities, [obj.id, 1]];
    this.setState({ listOfTasks : [...this.state.listOfTasks,obj ], priorities : new_prio,});
  }
/*change the priority of a task given
*@param {String} id the id of the task
*@param {Integer} the new level of priority
*/
  changePriority(id, prio){
    const new_prio = [...this.state.priorities];
    new_prio.forEach(item => {
      if (item[0] == id){
        item[1] = prio;
        }
      }
    );
    this.setState({priorities : new_prio});
  }

  render() {
    return (
      <div className="taskApp">
        <AddTask addTask={this.addTask}/>
        <ToDo listOfTasks={this.state.listOfTasks} doneTask={this.doneTask} priorities={this.state.priorities} changePriority={this.changePriority}/>
        <Done listOfTasksDone={this.state.listOfTasksDone} priorities={this.state.priorities} changePriority={this.changePriority}/>
      </div>
    );
  }

}

const simulateFetch = async mockURL => {
    await setTimeout( () => console.log(`simulate fetching data from ${mockURL}`), 10);
    return tasksData;
}
