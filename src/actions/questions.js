import API from '../_DATA';

import { ADD_NEW_QUESTION } from './shared'
function addNewQuestion(question,authedUserID){
    return {
        type:ADD_NEW_QUESTION,
        question,
    }
}
/**
 * save new question to remote server then update state.questions
 * @constructor
 * @param {object} question - The new question {opthinOne,optionTwo,authorID}.
 */
export function handleAddNewQuestion(question){
    return (dispatch)=>{
        API._saveQuestion(question).then((fquestion)=>{
            dispatch(addNewQuestion(fquestion));
        })
    }
}