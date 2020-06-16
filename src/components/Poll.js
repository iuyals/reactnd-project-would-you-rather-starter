import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ifUserAnswered, getUserOption } from '../utils/helper';
import { handleAddAnswerToQuestion } from '../actions/shared'
import { handdleAddNewQuestion } from '../actions/questions';


function Poll(props) {
    const { dispatch, match: { params: { pollID } }, state: { questions, users } } = props;
    function handleSubmit(event){
        event.preventDefault();
        console.log('***submited',event.target.option.value)
        let answer=event.target.option.value;
        dispatch(handleAddAnswerToQuestion(users['authedUserID'],pollID,answer) );
    }

    let authedUser = users[users['authedUserID']];
    let question = questions[pollID]
    if (authedUser === undefined) {
        return (<div>log in first</div>)
    }
    if (ifUserAnswered(authedUser, pollID)) {
        let precetageOfOptionOne=100 * question.optionOne.votes.length /
        (question.optionOne.votes.length + question.optionTwo.votes.length);
        let precetageOfOptionTwo=100-precetageOfOptionOne;
        return (
            <div class='answeredPoll'>
                <p className='small-font'>
                    asked by {question.author}
                </p>
                <h2>Result:</h2>
                <div>
                    would u rather:
                        <ol>
                        <li>
                            {question.optionOne.text}
                            <span className='number margin-large'>{precetageOfOptionOne}% selcted</span>
                        </li>
                        <li>
                            {question.optionTwo.text}
                            <span className='number margin-large'>{precetageOfOptionTwo}% selcted</span>
                        </li>

                    </ol>
                        you select: {getUserOption(authedUser, pollID)}
                </div>
            </div>
        )
    }
    else {
        return (
            <div class='unanswedPoll'>
                <p className='small-font'>
                    {question.author} asks:

                    </p>
                <div>
                    would u rather:
                    <form onSubmit={handleSubmit}>
                        <input type='radio'
                            id='optionOne'
                            value="optionOne"
                            name="option"
                        />
                        <label for='optionOne'>
                            {question.optionOne.text}
                        </label>
                        <br/>
                        <input type='radio'
                            id='optionTwo'
                            value="optionTwo"
                            name="option"
                        />
                        <label for='optionTwo'>
                            {question.optionTwo.text}
                        </label>
                        <br/>
                        <button type='submit'>submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default connect(state => ({ state: state }))(Poll);