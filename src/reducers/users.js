import {CHANGE_AUTHORED_USER} from '../actions/users';
import {RECEIVE_DATA,ADD_NEW_QUESTION} from '../actions/shared';
import { ADD_ANSWERED_QUESTION } from '../actions/shared'

export default function usersReducer(state={},action){
    
    switch(action.type){
        case CHANGE_AUTHORED_USER:
            return {
                ...state,
                authedUserID:action.authedUserID,
            };
        case ADD_ANSWERED_QUESTION:
            return {
                ...state,
                [action.authedUserID]:{
                    ...(state[action.authedUserID]),
                    'answers':{
                        ...(state[action.authedUserID]['answers']),
                        [action.qid]:action.answer
                    }
                },
                
            }
        case ADD_NEW_QUESTION:{
            let authedUserID=action.question.author;
            console.log(authedUserID,action.question)
            return{
                ...state,
                [authedUserID]:{
                    ...(state[authedUserID]),
                    questions:[
                        ...(state[authedUserID].questions),
                        action.question.id,
                    ]
                }
            }
        }
        case RECEIVE_DATA:
            return action.users;
        default:
            return state;
    }
}