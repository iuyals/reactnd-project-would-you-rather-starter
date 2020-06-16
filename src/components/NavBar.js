import React from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared'
import { changeAuthedUser, handleAddAnswerQuestion } from '../actions/users'
import { handdleAddNewQuestion } from '../actions/questions'


export default class NavBar extends React.Component{
//props needed: user a user obj for render user status
    render(){
        return (
            <div id='navbar'>
                <button>Home</button>
                <button>New question</button>
                <button>Leader Board</button>
                <StatusBar user={this.props.user} />
                <button>logout</button>
            </div>
        )
    }
}

class StatusBar extends React.Component{

    render(){
        if(!this.props.user){
            return <span></span>
        }
        return(
            <span>
                hi {this.props.user.name}
                <image src={this.props.user.avatarUrl} />
            </span>
        )
    }
}