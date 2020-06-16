import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'


import { handleInitialData } from '../actions/shared'
import { changeAuthedUser, handleAddAnswerToQuestion } from '../actions/users'
import { handdleAddNewQuestion } from '../actions/questions'

import NavBar from './NavBar';
import Home from './Home';
import Poll from './Poll'

import './App.css';

class App extends React.Component {

  render() {
    if (this.props.state.loading === true) {
      return <h2>loading...</h2>
    }
    let { users } = this.props.state;
    return (
      <div id='app'>
        <NavBar user={users[users['authedUserID']]} />
        <Route path='/' exact render={({ history }) => (
          <Home />
        )} />
        <Route path='/polls/:pollID' component={Poll} />

      </div>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData()).then(state => {
      dispatch(changeAuthedUser("tylermcginnis"));
      // dispatch(handleAddAnswerToQuestion('tylermcginnis', 'loxhs1bqm25b708cmbf3g', 'optionOne'));
      dispatch(handdleAddNewQuestion({ optionOneText: 'walk', optionTwoText: 'run', author: 'sarahedo' }));
    });

  }
}

export default connect(state => ({ state: state }))(App);
