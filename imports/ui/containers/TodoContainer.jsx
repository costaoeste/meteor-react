import React, { Component,PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../../api/tasks.js';
import Task from '../Task.jsx';


export default class TodoContainer extends Component{

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  render(){
    return (
      <div>
          <h1>{this.props.incompleteCount} tareas pendientes</h1>


            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Ocultas tareas realizadas
            </label>

            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Añadir nueva tarea"
              />
            </form>

          <ul>
            {this.renderTasks()}
          </ul>
        </div>
    );
  }

  renderTasks() {

    let filteredTasks = this.props.tasks;
    if(this.state.hideCompleted){
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => {
         const currentUserId = this.props.currentUser && this.props.currentUser._id;
         const showPrivateButton = task.owner === currentUserId;

         return (
           <Task
             key={task._id}
             task={task}
             showPrivateButton={showPrivateButton}
           />
         );
       });
  }

  handleSubmit(event){
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);


    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
      incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
      currentUser: Meteor.user(),
    });
  }
}

TodoContainer.propTypes = {
  tasks:PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer( () => {
  Meteor.subscribe('tasks');

  return {
    tasks:Tasks.find({}, {sort:{createdAt:-1} } ).fetch(),
    incompleteCount : Tasks.find({
      checked:{
        $ne:true
      }
    }).count(),
    currentUser: Meteor.user(),
  };
},TodoContainer);
