import {RECEIVE_DATA,ADD_NEW_QUESTION} from '../actions/shared';
import { ADD_ANSWERED_QUESTION } from '../actions/shared';

export default function questionsRducer(state={},action){
    let questions=state;
    let qid=action.qid;
    let answer=action.answer;
    switch(action.type){
        case ADD_NEW_QUESTION:
            return {...state,[action.question.id]:action.question};
        case RECEIVE_DATA:{
            return action.questions;
        }
        case ADD_ANSWERED_QUESTION:{
            return {
                ...questions,
                [qid]: {
                  ...questions[qid],
                  [answer]: {
                    ...questions[qid][answer],
                    votes: questions[qid][answer].votes.concat([action.authedUserID])
                  }
                }
              }
        }
        
        default:
            return state;
    }
}
