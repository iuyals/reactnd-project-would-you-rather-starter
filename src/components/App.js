import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'


import { handleInitialData } from '../actions/shared'


import NavBar from './NavBar';
import Home from './Home';
import Poll from './Poll';
import LeaderBoard from './LearderBoard';
import NewPoll from './NewPoll';
import Login from './Login'

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
        {users['authedUserID'] === undefined ?
          (
            <Login />
          )
          :
          (
            <div>
              <Route path='/' exact render={({ history }) => (
                <Home />
              )} />
              <Route path='/polls/:pollID' component={Poll} />
              <Route path='/leaderboard' component={LeaderBoard} />
              <Route path='/add' component={NewPoll} />
            </div>
          )
        }
      </div>
    )
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData()).then(state => {
      console.log('data received!')
    });

  }
}

export default connect(state => ({ state: state }))(App);
