import React from 'react';
import { connect } from 'react-redux';
import { ifUserAnswered, getUserOption } from '../utils/helper';
import { handleAddAnswerToQuestion } from '../actions/shared'


function Poll(props) {
    const { dispatch, match: { params: { pollID } }, state: { questions, users } } = props;
    function handleSubmit(event) {
        event.preventDefault();
        let answer = event.target.option.value;
        dispatch(handleAddAnswerToQuestion(users['authedUserID'], pollID, answer));
    }

    let authedUser = users[users['authedUserID']];
    let question = questions[pollID]
    if(!question){
        return (
            <div>
                <h1>404 not found</h1>
            </div>
        )
    }
    if (authedUser === undefined) {
        return (<div>log in first</div>)
    }
    if (ifUserAnswered(authedUser, pollID)) {
        let precetageOfOptionOne = 100 * question.optionOne.votes.length /
            (question.optionOne.votes.length + question.optionTwo.votes.length);
        let precetageOfOptionTwo = 100 - precetageOfOptionOne;
        return (
            <div className='answeredPoll'>
                <img src={users[question.author].avatarURL} width="60 px" alt="avatar" />
                <span className='small-font'>
                    asked by {question.author}
                </span>
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
                        you select: {getUserOption(authedUser, pollID) === 'optionOne' ? '1' : '2'}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='unanswedPoll'>
                <img src={users[question.author].avatarURL} width="60 px" alt="avatar" />
                <span className='small-font'>
                    {question.author} asks
                </span>
                <div>
                    would u rather:
                    <form onSubmit={handleSubmit}>
                        <input type='radio'
                            id='optionOne'
                            value="optionOne"
                            name="option"
                        />
                        <label htmlFor='optionOne'>
                            {question.optionOne.text}
                        </label>
                        <br />
                        <input type='radio'
                            id='optionTwo'
                            value="optionTwo"
                            name="option"
                        />
                        <label htmlFor='optionTwo'>
                            {question.optionTwo.text}
                        </label>
                        <br />
                        <button type='submit'>submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default connect(state => ({ state: state }))(Poll);