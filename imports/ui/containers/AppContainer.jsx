import React, { Component,PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from '../AccountsUiWrapper.jsx';
import TodoContainer from '../containers/TodoContainer.jsx';


export default class AppContainer extends Component{

  render(){
    return (
      <div className="container">
        <header>
          { this.props.currentUser ? (
            <TodoContainer/>
          ) :           <AccountsUIWrapper /> }
      </header>
    </div>)
    ;
  }
}

AppContainer.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer( () => {
  return {
    currentUser: Meteor.user(),
  };
},AppContainer);
