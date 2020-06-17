import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {handleAddNewQuestion} from '../actions/questions'

export  function NewPoll(props){
    let his=useHistory();
    function handleSubmit(event){
        event.preventDefault();
        const { dispatch,state: { users } } = props;
        let authedUserID=users['authedUserID'];
        let optionOneText=event.target.optionOne.value;
        let optionTwoText=event.target.optionTwo.value;
        dispatch(handleAddNewQuestion({optionOneText,optionTwoText,author:authedUserID}));
        his.push('/');
    }
    return(
        <div>
        <h3>create new Question</h3>
        <p>complete the Question</p>
        <h4>would you rather?</h4>
        <form onSubmit={handleSubmit}>
            <input type="text" name="optionOne"/>
            <p>or</p>
            <input type="text" name="optionTwo" />
            <button type='submit'>submit</button>
        </form>
        </div>
        
    )
}

export default connect(state => ({ state: state }))(NewPoll);